import random
from collections import Counter, defaultdict
from jsonfilelist import json_file_to_list, list_to_json_file
from constants.wordlistmodifications import shifted_words, removed_words

random.seed(0)

old_word_list_json_file = 'constants/allwordlist.json'
new_word_list_file = 'constants/wordlist.json'

old_valid_guesses_json_file = 'constants/allvalidGuesses.json'
new_valid_guesses_file = 'constants/validGuesses.json'

def get_words_of_length(word_length, word_list):
    return [word for word in word_list if len(word) == word_length]

def get_grapheme_freq(grapheme_length, word_list, grapheme_overlap=True):
    grapheme_freq = defaultdict(int)
    for word in word_list:
        step = 1 if grapheme_overlap else grapheme_length
        for i in range(0, len(word) - grapheme_length + 1, step):
            grapheme = word[i:(i + grapheme_length)]
            grapheme_freq[grapheme] += 1
    return grapheme_freq

def get_sorted_grapheme_freq(grapheme_freq):
    return sorted(grapheme_freq.items(), key=lambda kv: kv[1], reverse=True)

def get_word_list(old_word_list, graphemes, grapheme_overlap=True):
    new_word_list = []
    for word in old_word_list:
        if can_form_with_graphemes(word, graphemes, grapheme_overlap):
            new_word_list.append(word)
    return new_word_list

def can_form_with_graphemes(word, graphemes, grapheme_overlap=True):
    step = 1 if grapheme_overlap else grapheme_length
    for i in range(0, len(word) - grapheme_length + 1, step):
        grapheme = word[i:(i + grapheme_length)]
        if grapheme not in graphemes:
            return False
    return True

def move_items_to_back(items, list_):
    list_items = [word for word in list_ if word in items]
    list_ = [word for word in list_ if word not in items]
    list_ += list_items
    return list_

word_length = 8
grapheme_length = 2
grapheme_count = 32

old_word_list = json_file_to_list(old_word_list_json_file)
old_word_list = get_words_of_length(word_length, old_word_list)
old_word_list = [word for word in old_word_list if word not in removed_words]

grapheme_freq = get_grapheme_freq(grapheme_length, old_word_list, grapheme_overlap=False)
sorted_grapheme_freq = get_sorted_grapheme_freq(grapheme_freq)
top_graphemes = [grapheme_kv[0] for grapheme_kv in sorted_grapheme_freq[:grapheme_count]]
# print(top_graphemes)
# print(sorted([grapheme.upper() for grapheme in top_graphemes]))

new_word_list = get_word_list(old_word_list, top_graphemes, grapheme_overlap=False)
random.shuffle(new_word_list)
new_word_list = move_items_to_back(shifted_words, new_word_list)
list_to_json_file(new_word_list, new_word_list_file)

old_valid_guesses = json_file_to_list(old_valid_guesses_json_file)
old_valid_guesses = get_words_of_length(word_length, old_valid_guesses)
new_valid_guesses = get_word_list(old_valid_guesses, top_graphemes, grapheme_overlap=False)
new_valid_guesses.sort()
list_to_json_file(new_valid_guesses, new_valid_guesses_file)

valid_guesses_not_in_word_list_file = 'constants/nonsolutionguesses.json'
valid_guesses_not_in_word_list = [word for word in new_valid_guesses if word not in new_word_list]
list_to_json_file(valid_guesses_not_in_word_list, valid_guesses_not_in_word_list_file)

# Replace "*****" strings in json file by removing `  "\*+",\n` regex matches
# Replace regex `(\w+)(,?)` with `"$1"$2` to add double quotes around words in word .txt file
