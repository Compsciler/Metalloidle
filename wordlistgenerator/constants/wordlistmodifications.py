# Roughly 0.000015% - 0.000030% Ngram frequency in 2019
shifted_words = ["indenter", "medicate", "recoding", "starless", "ringside", "mainmast", "telecast", "tidiness", "andesite", "cantonal", "stringer", "sidereal", "starling", "castrate"]
shifted_words += ["decanter", "casement", "literati", "maleness", "malarial", "medicare", "testicle"]
shifted_words += ["semantic", "altering", "deletion"]  # Tutorial words

# Roughly 0% - 0.000015% Ngram frequency in 2019
removed_words = ["leanness", "costless", "resister", "congener", "casemate", "rainless", "distrain", "arrester", "dentinal", "canticle", "remanent", "demerara", "siderite", "cantonal", "dearness", "arcadian"]
removed_words += ["liniment", "arsenide", "arsenite", "selenite", "conidial", "sternite", "laterite"]

"""
Google Books Ngram Viewer word links:
https://books.google.com/ngrams/graph?content=costless%2Crecoding%2Cleanness%2Cdistrain%2Crainless%2Cringside%2Cindenter%2Cmedicate%2Cresister%2Cstarless%2Ccongener%2Ccasemate&year_start=1950&year_end=2019&corpus=26&smoothing=3
https://books.google.com/ngrams/graph?content=telecast%2Cmainmast%2Ccanticle%2Cdemerara%2Csisterly%2Cstunting%2Csiderite%2Cdentinal%2Cmassless%2Cremanent%2Ctidiness%2Carrester&year_start=1950&year_end=2019&corpus=26&smoothing=3
https://books.google.com/ngrams/graph?content=lateness%2Csideline%2Carcadian%2Crestorer%2Candesite%2Cmaleness%2Cdecanter%2Cuncaring%2Cmealtime%2Carranger%2Ccantonal%2Cdearness&year_start=1950&year_end=2019&corpus=26&smoothing=3
https://books.google.com/ngrams/graph?content=meteoric%2Cstringer%2Cserenely%2Cserially%2Csidereal%2Cmainline%2Cnestling%2Cstressor%2Ccontrite%2Clameness%2Calerting%2Cstalling&year_start=1950&year_end=2019&corpus=26&smoothing=3&direct_url=t1%3B%2Cmeteoric%3B%2Cc0%3B.t1%3B%2Cstringer%3B%2Cc0%3B.t1%3B%2Cserenely%3B%2Cc0%3B.t1%3B%2Cserially%3B%2Cc0%3B.t1%3B%2Csidereal%3B%2Cc0%3B.t1%3B%2Cmainline%3B%2Cc0%3B.t1%3B%2Cnestling%3B%2Cc0%3B.t1%3B%2Cstressor%3B%2Cc0%3B.t1%3B%2Ccontrite%3B%2Cc0%3B.t1%3B%2Clameness%3B%2Cc0%3B.t1%3B%2Calerting%3B%2Cc0%3B.t1%3B%2Cstalling%3B%2Cc0
https://books.google.com/ngrams/graph?content=untiring%2Cunerring%2Cstrident%2Cmalarial%2Cdistally%2Ccasement%2Cstarling%2Clistless%2Cliterati%2Ccationic%2Cstrangle%2Cradially&year_start=1950&year_end=2019&corpus=26&smoothing=3
"""