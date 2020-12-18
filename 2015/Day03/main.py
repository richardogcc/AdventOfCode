#!/usr/bin/env python
# -*- coding: utf-8 -*-

def readFromFile(pathFile):
    return (open(pathFile, 'r').read())


def partOne():
    north = '^'
    south = 'v'
    east = '>'
    west = '<'

    # n s e w
    houses = [0, 0, 0, 0]

    for i in readFromFile('input.txt'):
        if i == north:
            houses[0] = houses[0] + 1
        elif i == south:
            houses[1] = houses[1] + 1
        elif i == east:
            houses[2] = houses[2] + 1
        elif i == west:
            houses[3] = houses[3] + 1

    acc = 0
    for i in houses:
        if i >= 1:
            acc += 1

    return acc

# print(partOne())


north = '^'
south = 'v'
east = '>'
west = '<'

raw = readFromFile('sample.txt')
matrix = []
acc = 0

for i in raw:
    if acc < len(raw):
        matrix.append([0] * 4)
    acc += 1

acc = 0

for i in raw:
    if acc < len(raw):
        for j in range(4):
            if i == north:
                matrix[acc][0] += 1 
            elif i == south:
                matrix[acc][1] += 1
            elif i == east:
                matrix[acc][2] += 1
            elif i == west:
                matrix[acc][3] += 1
    acc += 1


print(matrix)
# print('First part: {}\nSecond part: {}'.format(1, 1))