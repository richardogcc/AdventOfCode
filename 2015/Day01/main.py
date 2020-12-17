#!/usr/bin/env python
# -*- coding: utf-8 -*-

def readFromFile(pathFile):
    return (open(pathFile, 'r').read())

fileInput = readFromFile('./input.txt')

def evaluate(raw):
    level = 0

    for i in raw:
        if i == '(':
            level += 1    
        else:
            level -= 1

    return level

def firstTimeBasement(raw):
    level = 0
    pos = 1

    for i in raw:
        if i == '(':
            level += 1    
        else:
            level -= 1
            if level == -1:
                return pos    
        pos += 1
            

print('First part: {}\nSecond part: {}'.format(evaluate(readFromFile('./input.txt')), firstTimeBasement(readFromFile('./input.txt'))))