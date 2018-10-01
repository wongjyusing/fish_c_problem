# 打印Hello World

# 以前的写法
print('Hello World')


# 使用变数打印 Hello World
demo = 'Hello World'
print(demo)

# 使用字符拼接打印'Hello World'
demo = 'World'
print('Hello ' + demo)

# 使用原来%s方法打印
demo = 'World'
print('Hello %s' % demo)

# 最新的特性 f 写法

a = 'world'
b = f'Hello {a}'
print(b)


# 你这段代码的意思

# 导入随机包 简写为r
import random as r

# 生成一个列表
guess = ['石头', '剪刀', '布', '石头']

# player = 等于输入的内容。
# input打印的内容是打印guess中所有的内容
# 你可以把打印的内容理解为 帮助文字
# 而你输入的内容会被赋值给player这个变数


#我们把f'{guess[0:3]}：拆解出来理解

# guess[0:3] 由于guess是一个列表 ，里面有4个元素
# 由于列表是从0开始数，所以[0:3]是取guess这个列表的0,1,2,3这四个元素
# [0:3]是列表的切片方法

# f‘’你可以理解为format的简写方法
player = input(f'{guess[0:3]}：')
