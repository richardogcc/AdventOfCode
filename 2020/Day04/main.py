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


validPassport = 0
for entry in listOfObjects(formated):
    if len(entry) >= 7:
        print('Valid passport: {}'.format(entry.get('pid')))
        validPassport += 1

print(validPassport)