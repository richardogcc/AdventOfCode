#!/usr/bin/env python
# -*- coding: utf-8 -*-

def readFromFile(pathFile):
    return (open(pathFile, 'r').read()).split('\n')

fileInput = readFromFile('./input.txt')

first_part_winner = []
second_part_winner = []

def firstPart():
    for x in fileInput:
        for y in fileInput:
            if int(x) + int(y) == int(2020):
                first_part_winner.append(int(x))
                first_part_winner.append(int(y))
                return

def secondPart():
    for x in fileInput:
        for y in fileInput:
            for j in fileInput:
                if int(x) + int(y) + + int(j)== int(2020):
                    second_part_winner.append(int(x))
                    second_part_winner.append(int(y))
                    second_part_winner.append(int(j))
                    return

def res_part_one():
    firstPart()
    if len(first_part_winner) != 0:
        final = first_part_winner[0] * first_part_winner[1]
        print('Final result for part one is {}'.format(final))

def res_part_two():
    secondPart()
    if len(second_part_winner) != 0:
        final = second_part_winner[0] * second_part_winner[1] * second_part_winner[2]
        print('Final result for part two is {}'.format(final))

res_part_one()
res_part_two()