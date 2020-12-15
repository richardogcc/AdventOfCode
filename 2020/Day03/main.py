#!/usr/bin/env python
# -*- coding: utf-8 -*-

def readFromFile(pathFile):
    return (open(pathFile, 'r').read()).split('\n')

def counter(rawInput, in_down, in_right):
    down = 0
    right = 0
    trees = 0

    forest = []
    for line in rawInput:
        forest.append(list(line))

    while down + 1 < len(forest):
        down += in_down
        right += in_right

        if forest[down][right % len(forest[down])] == '#':
            trees += 1

        '''-------Only GUI Result--------'''
        # if forest[down][right % len(forest[down])] == '.':
        #     forest[down][right % len(forest[down])] = 'O'
        # else:
        #     forest[down][right % len(forest[down])] = 'X'
        # print('{}\tFila: {}, Columna: {}'.format(''.join(forest[down]), down, right % len(forest[down])))
        '''-------------------------------'''

    # print('\n\n\nDown: {}\nTrees: {}'.format(down, trees))
    return trees


c1 = counter(readFromFile('input.txt'), 1, 3)
print('Result parte one: ' + str(c1))

c1 = c1 * counter(readFromFile('input.txt'), 1, 1)
c1 = c1 * counter(readFromFile('input.txt'), 1, 5)
c1 = c1 * counter(readFromFile('input.txt'), 1, 7)
c1 = c1 * counter(readFromFile('input.txt'), 2, 1)

print('Final result: ' + str(c1))