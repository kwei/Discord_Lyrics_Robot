#-*- coding:utf-8 -*-
from bs4 import BeautifulSoup as bs
from urllib.request import urlopen
import concurrent.futures as futures
import pytube
from pytube import YouTube
import time
import random
import sys
import os
import zipfile
from threading import current_thread


class videoData: # data class
    def __init__(self):

        self.__videoListUrl = []
        self.__videoTitle = []
        self.playListUrl = r'https://www.youtube.com/playlist?list=PLaCt9a8Ge4KA3ngaqwQ0tFsdYcO46cX39'
    def getVideoListUrl(self):
        return self.__videoListUrl
    def setVideoListUrl(self,videoListUrl):
        self.__videoListUrl = videoListUrl
    def getVideoTitle(self):
        return self.__videoTitle
    def setVideoTitle(self,videoTitle):
        self.__videoTitle = videoTitle


def _prepare_dl_info():

    url = sys.argv[1]
    if url != "":
        print("\n\t[ list url ] : " + url)
    else:
        print("[ Usage ] : python converter.py url")

    # pathText = "C:\\Users\\KW\Desktop\\dis\\modules\\musics"
    pathText = sys.argv[2]
    print("\n\t[ Use path ] : " + pathText)
    return url, pathText


def isList(url):
    if "list" in url:
        return True
    else:
        return False

def get_time_stamp():
    return time.time()

def _get_music_url(video_data, ytUrl, Tag_a):
    videoListUrl = []
    videoTitle = []
    counter = 0

    for link in Tag_a:
        try:
            linkHref = link['href']
            linkID = linkHref[:linkHref.find('&')]
            videoListUrl.append(ytUrl + linkID)
            videoTitle.append(str(link.text))
            print("\nvideo url : " + ytUrl + linkID)
            print("video title : " + str(link.text))
            counter = counter + 1
        except Exception:
            print(ytUrl + linkID, Exception.with_traceback)
            continue

    video_data.setVideoListUrl(videoListUrl)
    video_data.setVideoTitle(videoTitle)
    print("\n\t[ Total " + str(counter) + " songs ]\n")

def _search(video_data, ytUrl, tag, url):

    video_data.playListUrl = url

    html = urlopen(video_data.playListUrl)
    soup = bs(html, 'html.parser')
    # Find the tage of the every video links
    Tag_a = soup.find_all('a', class_= tag)
    if Tag_a == "":
        print("Not find video link in the playlist !")
    else:
        _get_music_url(video_data, ytUrl, Tag_a)

def _threadDownload(url, Type, save_path):
    yt = pytube.YouTube(url).streams.filter(type = Type)
    t = yt.first().download(output_path = save_path)

def _download(mydata, save_path):
    startTime = get_time_stamp()
    Type = "audio"
    try:
        with futures.ThreadPoolExecutor(max_workers=5) as executor:
            future_result = {executor.submit(_threadDownload, url, Type, save_path): url for url in mydata.getVideoListUrl()}
    except Exception:
        print("Download Error : " + Exception.with_traceback)
    endTime = get_time_stamp()

    print ("\n\t[ Total time cost : " + str(int(endTime-startTime)) + " sec ]")
    return


# def zip_files(pathText):
#     # zip all files into *.zip
#     pkg_ = zipfile.ZipFile(pathText + '.zip', mode = 'w')
#     parent_path = os.path.dirname(pathText)
#     for root, folders, files in os.walk(pathText):
#         for file in files:
#             abs_path = os.path.join(root, file)
#             relative_path = abs_path.replace(parent_path + '\\', '')
#             # print("file name : " + abs_path + relative_path)
#             pkg_.write(abs_path, relative_path)
#     # pkg_.write(os.path.join(pathText, '*'))
#     pkg_.close()



class DownloadDirector:
    def __init__(self, videoData, url, save_path):
        self.ds = videoData
        self.ytUrl = 'http://youtube.com'
        self.tag = 'pl-video-title-link yt-uix-tile-link yt-uix-sessionlink spf-link '
        self.url = url
        self.save_path = save_path
    def search_list(self):
        _search(self.ds, self.ytUrl, self.tag, self.url)
    def download(self):
        _download(self.ds, self.save_path)


def main():

    url, pathText = _prepare_dl_info()
    islist = isList(url)
    if(islist):
        video_data = videoData()
        director = DownloadDirector(video_data, url, pathText)
        director.search_list()
        director.download()
    else:
        _threadDownload(url, "audio", pathText)


    # zip_files(pathText)

if __name__ == "__main__":
    main()
    print("\n\t[ Download Complete ]")
