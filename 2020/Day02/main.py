#!/usr/bin/env python
# -*- coding: utf-8 -*-

def readFromFile(pathFile):
    return (open(pathFile, 'r').read()).split('\n')

def getLists(row):
    row = row.split(' ')
    return row[0].split('-'), row[1].split(':')[:1][0], row[2]

def validateP01(arr, char, string):
    return int(arr[0]) <= string.count(char) and string.count(char) <= int(arr[1])

def validateP02(arr, char, string):
    ev01 = string[int(arr[0])-1] == char
    ev02 = string[int(arr[1])-1] == char

    return 1 if [ev01, ev02].count(True) == 1 else 0

def evaluate():
    counterP01, counterP02 = 0, 0
    
    for row in readFromFile('input.txt'):
        tpl, char, string = getLists(row)
        counterP01 = counterP01 + 1 if validateP01(tpl, char, string) else counterP01
        counterP02 = counterP02 + 1 if validateP02(tpl, char, string) else counterP02
    
    return counterP01, counterP02

print(evaluate())