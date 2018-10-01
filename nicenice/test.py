
for i in range(1, 10):
    for j in range(1, i+1):
        print(f'{i}x{j}={i*j}\t',end='')
    print()


for i in range(1, 10):
    for j in range(1, i+1):
        print(f'{i}x{j}={i*j}\t',end='')
    print()


for i in range(1, 10):
    for j in range(1, i+1):
        print(f'{i}x{j}={i*j}\t',end='')
    print()

def nicenice(start,endnum):
    for i in range(start, endnum + 1):
        for j in range(start, i+1):
            print(f'{i}x{j}={i*j}\t',end='')


nicenice(1,9)
nicenice(2,9)
nicenice(11,11)
