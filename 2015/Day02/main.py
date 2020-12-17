#!/usr/bin/env python
# -*- coding: utf-8 -*-

def readFromFile(pathFile):
    return (open(pathFile, 'r').read()).split('\n')


def getInches(string):
    return [int(item)for item in string.split('x')]

def getSquareFeet(sizes):
    large = sizes[0]
    weight = sizes[1]
    height = sizes[2]

    return (2 * large * weight + 2 * weight * height + 2 * height * large) + min([large * weight, weight * height, height * large])

def partOne():
    acc = 0

    for i in readFromFile('input.txt'):
        acc += getSquareFeet(getInches(i))

    return acc

print(partOne())