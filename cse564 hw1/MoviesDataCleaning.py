#!/usr/bin/env python
# coding: utf-8

# In[2]:


#import dependecies

import pandas as pd
import numpy as np
import json as js
from datetime import datetime
import ast


# In[54]:


pd.set_option('display.max_columns',None)
movies_df = pd.read_csv('moviemetadata.csv')

movies_df['isCollection']= movies_df['belongs_to_collection'].notnull().astype('int')
movies_df=movies_df[movies_df.astype(str)['production_companies'] != '[]']
movies_df=movies_df[movies_df.astype(str)['production_countries'] != '[]']
movies_df=movies_df[movies_df.astype(str)['spoken_languages'] != '[]']
movies_df=movies_df[movies_df.astype(str)['genres'] != '[]']
movies_df= movies_df[movies_df['revenue'] != 0] 
movies_df= movies_df[movies_df['vote_average'] != 0]
movies_df= movies_df[movies_df['vote_count'] != 0]
movies_df= movies_df[movies_df['budget'] != '0']

movies_df["adult"]= movies_df["adult"].apply(lambda x: 1 if str(x) == "True" else 0).astype("float64")
movies_df["status"]= movies_df["status"].apply(lambda x: 1 if str(x) == "Released" else 0).astype("float64")

movies_df["genres"]=movies_df["genres"].apply(ast.literal_eval)
movies_df["production_companies"]=movies_df["production_companies"].apply(ast.literal_eval)
movies_df["production_countries"]=movies_df["production_countries"].apply(ast.literal_eval)

def get_list(x):
    if isinstance(x, list):
        keywords = [i['name'] for i in x]
        return keywords 
    return []

movies_df["genres"]=movies_df["genres"].apply(get_list)

movies_df["production_companies"]=movies_df["production_companies"].apply(get_list)
movies_df["production_countries"]=movies_df["production_countries"].apply(get_list)


cols_df= ['adult','isCollection','budget','genres','original_language',
            'popularity','production_companies','production_countries','release_date',
            'revenue','runtime','spoken_languages','status','vote_average','vote_count']

new_df=movies_df[cols_df]
new_df=new_df.sample(500)


new_df["spoken_languages"]=new_df["spoken_languages"].apply(ast.literal_eval)
new_df["spoken_languages"]=new_df["spoken_languages"].apply(get_list)

#handle original language
l=np.array(new_df["original_language"])
languages,counts=np.unique(l,return_counts=True)
print(languages)
print(counts)
lang=pd.DataFrame()
lang["original_languages"]=languages
lang["counts"]= counts
lang
lang.to_csv("movie_original_languages.csv",index=False)

#handle genres
df = new_df["genres"].str.join('|').str.get_dummies()
genres_df =pd.DataFrame()
genres_df["genres"]= df.columns

genrecounts = []
for col in df.columns:
    genrecounts.append(df[col].sum())

genres_df["counts"]= genrecounts
genres_df.to_csv("movies_genres.csv",index = False)


#handle production countries
pc_df = new_df["production_countries"].str.join('|').str.get_dummies()
pc_df
ctry_df =pd.DataFrame()
ctry_df["production_countries"]= pc_df.columns

ctrycounts = []
for col in pc_df.columns:
    ctrycounts.append(pc_df[col].sum())

ctry_df["counts"]= ctrycounts
ctry_df

ctry_df.to_csv("movies_production_country.csv",index = False)

#handle spoken languages
l_df = new_df["spoken_languages"].str.join('|').str.get_dummies()
l_df
lang_df =pd.DataFrame()
lang_df["spoken_languages"]= l_df.columns

langcounts = []
for col in l_df.columns:
    langcounts.append(l_df[col].sum())

lang_df["counts"]= langcounts
lang_df.to_csv("movies_languages.csv",index=False)


#handle production companies
cmpy_df = new_df["production_companies"].str.join('|').str.get_dummies()
cmpy_df
pcmpy_df =pd.DataFrame()
pcmpy_df["production_companies"]= cmpy_df.columns

cmpycounts = []
for col in cmpy_df.columns:
    cmpycounts.append(cmpy_df[col].sum())

pcmpy_df["counts"]= cmpycounts
pcmpy_df=pcmpy_df.sort_values(by=["counts"],ascending=False)
pcmpy_df.head(45).to_csv("movies_production_companies.csv",index=False)

new_df.to_csv("moviesdataset.csv")


# In[ ]:





# In[ ]:




