#!/usr/bin/env python
# -*- coding: utf-8 -*-

def readFromFile(pathFile):
    return (open(pathFile, 'r').read()).split('\n')

def counter(rawInput):
    down = 0
    right = 0
    trees = 0

    for line in rawInput:
        if right > len(line):
            break

        if line[right] == '#':
            trees += 1
        
        '''-------------------------'''
        line = list(line)
        if line[right] == '.':
            line[right] = 'O'
        else:
            line[right] = 'X'

        line = ''.join(line)
        print(line)
        '''-------------------------'''

        down += 1
        right += 3
    print('\n\n\nDown: {}\nRight: {}\nTrees: {}'.format(down, right, trees))

counter(readFromFile('input.txt'))
