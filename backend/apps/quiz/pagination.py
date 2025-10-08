from rest_framework.pagination import PageNumberPagination
'''
i don't put page_size_param and max_page_size because by default
is None and users can't make request to decide page_size
'''
class SmallQuestionNumberPagination(PageNumberPagination):
    page_query_param = 'p'
    page_size = 1

class SuperSmallPageNumberPagination(PageNumberPagination):
    page_query_param = 'p'
    page_size = 10

class SmallPageNumberPagination(PageNumberPagination):
    page_query_param = 'p'
    page_size = 20

class MediumQuestionNumberPagination(PageNumberPagination):
    page_query_param = 'p'
    page_size = 50

class LargeQuestionNumberPagination(PageNumberPagination):
    page_query_param = 'p'
    page_size = 100