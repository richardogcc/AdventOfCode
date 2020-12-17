#!/usr/bin/env python
# -*- coding: utf-8 -*-

def readFromFile(pathFile):
    return (open(pathFile, 'r').read()).split('\n')


def formatText(input):
    formated = ''
    for i in readFromFile(input):
        if i == '':
            i = ';'
        formated = (formated + ' ' + i).strip()
    return formated


def createObject(string):
    node = {}

    for i in string.split(' '):
        if len(i.split(':')[:1]) > 0 and len(i.split(':')[1:]) > 0:
            key = i.split(':')[:1][0]
            value = i.split(':')[1:][0]
            node[key] = value
    return node

def listOfObjects(string):
    lofobj = []

    for i in string.split(';'):
        created = createObject(i)
        if bool(created):
            lofobj.append(created)

    return lofobj

def validate():
    validPassport = 0
    validListPassports = []

    for entry in listOfObjects(formatText('input.txt')):
        v = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
        isValid = v[0] in entry and v[1] in entry and v[2] in entry and v[3] in entry and v[4] in entry and v[5] in entry and v[6] in entry

        if isValid:
            validListPassports.append(entry)
            validPassport += 1
            
    return validPassport, validListPassports

'''---- Unit Tests ----'''
def byr(year):
    return int(year) >= 1920 and int(year) <= 2002

def iyr(year):
    return int(year) >= 2010 and int(year) <= 2020

def eyr(year):
    return int(year) >= 2020 and int(year) <= 2030

def hgt(size):
    num = parseInt(size)
    unit = size[-2:] if size[-2:].isalpha() else None
    if unit == 'cm':
        return int(num) >= 150 and int(num) <= 190
    elif unit == 'in':
        return int(num) >= 59 and int(num) <= 76
    
    return False

def is_hex(s):
    hex_digits = set("#0123456789abcdef")
    for char in s:
        if not (char in hex_digits):
            return False
    return True


def hcl(color):
    if len(color) == 0:
        return False

    if len(color) == 7:
        return is_hex(color.lower())
    else:
        return False

def ecl(color):
    return True if color in ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'] else False

def pid(passID):
    return passID.isnumeric() and len(passID) == 9

def parseInt(s):
    digits = ''
    for c in str(s).strip():
        if not c.isdigit():
            break
        digits += c

    return int(digits) if digits else None


def validatePartTwo():
    count = 0
    for i in validate()[1]:
        byr_ = byr(i['byr'])
        iyr_ = iyr(i['iyr'])
        eyr_ = eyr(i['eyr'])
        hgt_ = hgt(i['hgt'])
        hcl_ = hcl(i['hcl'])
        ecl_ = ecl(i['ecl'])
        pid_ = pid(i['pid'])

        if all([byr_, iyr_, eyr_, hgt_, hcl_, ecl_, pid_]):
            count += 1
        # else:
        #     print('{}\n{}\n\n'.format([byr_, iyr_, eyr_, hgt_, hcl_, ecl_, pid_], i))
            
    return count



print('Part One\nValid Passports: {}\n\n\nPart Two\nValid Passports: {}'.format(validate()[0], validatePartTwo()))