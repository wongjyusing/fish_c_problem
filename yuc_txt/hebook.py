import requests
from bs4 import BeautifulSoup as bs

def get_response(url): # 打开网页函数
    headers = {
        'User-Agent': "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.75 Safari/537.36"}
    response = requests.get(url, headers)
    response.encoding = 'utf-8'

    return response

def get_text_and_link(base_url,req,link_name,text_name,items):
    response = get_response(base_url)
    soup = bs(response.text, 'lxml')
    #print(len(soup.select(req)))
    items = items
    for item in soup.select(req):
        items[link_name] = 'http://www.hetushu.com' + item['href']
        items[text_name] = item.text
        yield items
def get_content(url,items):
    response = get_response(url)
    soup = bs(response.text, 'html.parser')
    content = soup.find('#content').strings
    items = items
    writeFile(items['book_name'],items['chapter_name'],content)

def writeFile(book_name,title,content):
    with open(book_name + '.txt','a',encoding='utf-8')as txt_file:
        #设置文件编码，避免写入时乱码
        txt_file.write('\n'+title+'\n')
        for line in content:
            #content是一个生成器，采用for循环逐次写入文件
            txt_file.write(line)
    print('%s was writed ..'%title)

def main():
    print(get_response('http://www.hetushu.com/book/3600/2701130.html').text)
    items = {}
    base_url = 'http://www.hetushu.com/book/index.php'
    book_links = get_text_and_link(base_url,'.name a','book_link','bookname',items)
    for item in book_links:
        print('http://www.hetushu.com' + item['book_link'])
        chapter = get_text_and_link(item['book_link'],'#dir a','chapter_link','chapter_name',items)
        for item in chapter:
            get_content(item['chapter_link'],items)





if __name__ == '__main__':
    main()
