def x(y):
    if y==1:
        return 10
    else:
        return x(y-1)+2
year=int(input('第幾個人的年紀:'))
z=x(year)
#print('第%d個人年紀為%d歲'%year,z)
print(f'第{ year }個人年紀為{ z }歲')

