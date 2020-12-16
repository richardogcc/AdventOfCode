#!/usr/bin/env python
# -*- coding: utf-8 -*-

def readFromFile(pathFile):
    return (open(pathFile, 'r').read()).split('\n')

formated = ''
for i in readFromFile('input.txt'):
    if i == '':
        i = ';'
    formated = (formated + ' ' + i).strip()

def createObject(string):
    node = {}

    for i in string.split(' '):
        if len(i.split(':')[:1]) > 0 and len(i.split(':')[1:]):
            key = i.split(':')[:1][0]
            value = i.split(':')[1:][0]
            node[key] = value
    return node

def listOfObjects(string):
    lofobj = []

    for i in formated.split(';'):
        created = createObject(i)
        if bool(created):
            lofobj.append(created)
    return lofobj

isV = None
validPassport = 0
for entry in listOfObjects(formated):
    v = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
    isValid = v[0] in entry and v[1] in entry and v[2] in entry and v[3] in entry and v[4] in entry and v[5] in entry and v[6] in entry

    if isValid:
        validPassport += 1

print(isV)
print(validPassport)