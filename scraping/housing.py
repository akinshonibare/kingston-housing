import json
import pymongo
import requests
from selenium import webdriver
from bs4 import BeautifulSoup


scraped_housing = []


def mackinnon_scrapper():
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    options.add_argument("--disable-gpu")
    options.add_argument("--log-level=3")
    driver = webdriver.Chrome(chrome_options=options)
    house_driver = webdriver.Chrome(chrome_options=options)

    URL = "http://mackinnondev.ca/rental-units/"
    driver.get(URL)

    rentals_wrapper = driver.find_element_by_css_selector('ul.rentals')
    rentals = rentals_wrapper.find_elements_by_tag_name('a')

    for i in range(len(rentals)):
        house_dict = {}
        rental_href = rentals[i].get_attribute('href')
        house_driver.get(rental_href)

        house_dict["url"] = rental_href
        house_dict["address"] = house_driver.find_element_by_id(
            'postTitle').find_element_by_tag_name('h2').text

        house_dict["price"] = house_driver.find_element_by_id(
            'metaPrice').find_element_by_tag_name('li').text.replace(',', '').replace(' Inclusive', '')

        house_dict["type"] = house_driver.find_element_by_id(
            'metaList').find_element_by_css_selector("li.propertyType").text

        house_dict["beds"] = house_driver.find_element_by_id(
            'metaList').find_element_by_css_selector("li.propertyBed").text

        house_dict["bath"] = house_driver.find_element_by_id(
            'metaList').find_element_by_css_selector("li.propertyBath").text

        house_dict["img"] = house_driver.find_element_by_css_selector(
            'li.bx-clone').get_attribute("style").split(";")[0].split("background-image: url(\"")[1].split("\")")[0]

        house_dict["agency"] = "mackinnon development"

        if(house_dict["price"] == "Leased" or house_dict["price"] == "Pending"):
            print(house_dict)
        else:
            house_dict["full_price"] = int(house_dict["price"][1:])
            house_dict["price"] = int(
                house_dict["full_price"]/int(house_dict["beds"]))
            scraped_housing.append(house_dict)

    driver.close()


def search_student_housing():
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    options.add_argument("--disable-gpu")
    options.add_argument("--log-level=3")
    driver = webdriver.Chrome(chrome_options=options)

    for i in range(1, 3):
        URL = "https://www.search4studenthousing.com/queen-s/kingston/?page=" + \
            str(i)
        driver.get(URL)

        rentals = driver.find_elements_by_css_selector('div.clearfix')

        for j in range(len(rentals)):
            house_dict = {}
            house_dict['url'] = rentals[j].find_element_by_tag_name(
                'a').get_attribute('href')
            house_dict['address'] = rentals[j].find_element_by_css_selector(
                'div.col-md-5').find_element_by_tag_name('a').text
            house_dict['img'] = rentals[j].find_element_by_css_selector(
                'img.thumbnail').get_attribute('src')

            house_dict['full_price'] = int(rentals[j].find_elements_by_css_selector(
                'div.col-md-2')[1].text[6:-3])
            house_dict['type'] = rentals[j].find_elements_by_css_selector(
                'div.col-md-2')[2].text[5:].lower()
            house_dict["agency"] = "search 4 student housing"

            # scraped_housing.append(house_dict)
            print(house_dict)

    driver.close()


def frontenac_scrapper():
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    options.add_argument("--disable-gpu")
    options.add_argument("--log-level=3")
    driver_PAGE1 = webdriver.Chrome(chrome_options=options)
    # driver_PAGES = webdriver.Chrome(chrome_options=options)

    URL_PAGE1 = "https://www.frontenacproperty.com/properties/student/?sort=availability&order=ASC"

    driver_PAGE1.get(URL_PAGE1)
    rentals_wrapper = driver_PAGE1.find_element_by_css_selector(
        'div.property-listings')

    rentals = rentals_wrapper.find_elements_by_css_selector(
        'article.property-listing')

    for i in range(len(rentals)):
        house_dict = {}
        house_dict["url"] = rentals[i].find_element_by_css_selector(
            'div.property-img').find_element_by_tag_name('a').get_attribute('href')
        house_dict["address"] = rentals[i].find_element_by_tag_name(
            'h4').text

        house_dict["full_price"] = rentals[i].find_element_by_css_selector(
            'span.property-price').find_element_by_tag_name('b').text
        house_dict["beds"] = rentals[i].find_elements_by_css_selector(
            'span.bedrooms')[0].text.split(" ")[0]
        house_dict["bath"] = rentals[i].find_elements_by_css_selector(
            'span.bedrooms')[1].text.split(" ")[0]
        house_dict["img"] = rentals[i].find_element_by_css_selector(
            'div.property-img').find_element_by_tag_name('a').find_element_by_tag_name('img').get_attribute('src')
        house_dict["agency"] = "frontenac property"
        house_dict["type"] = "house"

        try:
            house_dict["price"] = int(house_dict["address"][house_dict["address"].index(
                '$')+1:house_dict["address"].index('$') + 4])
            house_dict["full_price"] = int(house_dict["full_price"][1:])
            scraped_housing.append(house_dict)
        except:
            print('no price')

    driver_PAGE1.close()

    # for page_num in range(2, 15):
    #     URL_PAGE = "https://www.frontenacproperty.com/properties/student/page/" + \
    #         str(page_num)+"/?sort=availability&order=ASC"
    #     driver_PAGES.get(URL_PAGE)
    #     rentals_wrapper = driver_PAGES.find_element_by_css_selector(
    #         'div.property-listings')
    #     rentals = rentals_wrapper.find_elements_by_css_selector(
    #         'article.property-listing')

    #     for i in range(len(rentals)):
    #         house_dict = {}
    #         house_dict["url"] = rentals[i].find_element_by_css_selector(
    #             'div.property-img').find_element_by_tag_name('a').get_attribute('href')
    #         house_dict["address"] = rentals[i].find_element_by_tag_name(
    #             'h4').text

    #         house_dict["price"] = rentals[i].find_element_by_css_selector(
    #             'span.property-price').find_element_by_tag_name('b').text
    #         house_dict["beds"] = rentals[i].find_elements_by_css_selector(
    #             'span.bedrooms')[0].text.split(" ")[0]
    #         house_dict["bath"] = rentals[i].find_elements_by_css_selector(
    #             'span.bedrooms')[1].text.split(" ")[0]
    #         house_dict["img"] = rentals[i].find_element_by_css_selector(
    #             'div.property-img').find_element_by_tag_name('a').find_element_by_tag_name('img').get_attribute('src')
    #         scraped_housing.append(house_dict)
    # driver_PAGES.close()


def upload(housing):
    mongoclient = pymongo.MongoClient(
        "mongodb://admin:PASSword123@ds139370.mlab.com:39370/kingston-housing")
    mydb = mongoclient["kingston-housing"]
    record = mydb["houses"]
    record.delete_many({})

    for i in housing:
        record.insert_one(i)


search_student_housing()
# frontenac_scrapper()
# mackinnon_scrapper()
# upload(scraped_housing)
