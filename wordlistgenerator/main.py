import random
from collections import Counter
from jsonfilelist import json_file_to_list, list_to_json_file
from constants.wordlistmodifications import added_words, shifted_words, removed_words

random.seed(0)
random.seed(random.randrange(random.randrange(10**3)))

old_word_list_json_file = 'constants/allwordlist.json'
new_word_list_file = 'constants/wordlist.json'

old_valid_guesses_json_file = 'constants/allvalidGuesses.json'
new_valid_guesses_file = 'constants/validGuesses.json'

import bisect

def find_in_sorted_list(elem, sorted_list):
    i = bisect.bisect_left(sorted_list, elem)
    if i != len(sorted_list) and sorted_list[i] == elem:
        return i
    return -1

def in_sorted_list(elem, sorted_list):
    i = bisect.bisect_left(sorted_list, elem)
    return i != len(sorted_list) and sorted_list[i] == elem

grapheme_count = 4
grapheme_list = ['H', 'He', 'C', 'N', 'O', 'F', 'Ne', 'P', 'S', 'Cl', 'Ar', 'Se', 'Br', 'Kr', 'I', 'Xe', 'At', 'Rn']
grapheme_list += ['B', 'Si', 'Ge', 'As', 'Sb', 'Te']
# grapheme_list = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]
# grapheme_list = [grapheme.lower() for grapheme in grapheme_list]

def get_word_list(old_word_list):
    new_word_list = []
    dfs("", 0, new_word_list, old_word_list)
    return new_word_list

def dfs(word, index, new_word_list, old_word_list):
    if index == grapheme_count:
        if in_sorted_list(word.lower(), old_word_list):
            new_word_list.append(word)
        return
    for grapheme in grapheme_list:
        dfs(word + grapheme, index + 1, new_word_list, old_word_list)

def move_items_to_back(items, list_):
    list_items = [word for word in list_ if word.lower() in items]
    list_ = [word for word in list_ if word.lower() not in items]
    list_ += list_items
    return list_

old_word_list = json_file_to_list(old_word_list_json_file)
old_word_list += added_words
old_word_list = [word for word in old_word_list if word.lower() not in removed_words]

old_word_list_sorted = sorted(old_word_list)
new_word_list = get_word_list(old_word_list_sorted)
new_word_list.sort(key=lambda word: old_word_list.index(word.lower()))
random.shuffle(new_word_list)
new_word_list = move_items_to_back(shifted_words, new_word_list)
list_to_json_file(new_word_list, new_word_list_file)

old_valid_guesses = json_file_to_list(old_valid_guesses_json_file)
new_valid_guesses = get_word_list(old_valid_guesses)
new_valid_guesses.sort()
list_to_json_file(new_valid_guesses, new_valid_guesses_file)

valid_guesses_not_in_word_list_file = 'constants/nonsolutionguesses.json'
valid_guesses_not_in_word_list = [word for word in new_valid_guesses if word not in new_word_list]
list_to_json_file(valid_guesses_not_in_word_list, valid_guesses_not_in_word_list_file)
