from flask import Flask, render_template
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
from sklearn.manifold import MDS
from scipy.spatial.distance import correlation
import json
import sys


app = Flask(__name__)


def kmeanscluster(X):
    distortions = []
    for k in range(1,10):
        kmeanModel = KMeans(n_clusters=k)
        kmeanModel.fit(X)
        distortions.append(kmeanModel.inertia_)

    dist=json.dumps(distortions)
    print("var distortions= '{}'".format(dist))

    num_clusters= 2
    json.dumps(num_clusters)
    print("var k= '{}'".format(num_clusters))

    kmeans = KMeans(n_clusters=num_clusters, random_state=0).fit(X)
    labels = kmeans.labels_
    kmeans_labels = json.dumps(labels.tolist())

    print("var labels= '{}'".format(kmeans_labels))

def column(matrix, i):
    return [row[i] for row in matrix]


def compute_MDS(X):
    mds = MDS(metric=True, random_state=0)
    X_transform = mds.fit_transform(X)

    Xdata_mds = json.dumps(X_transform.tolist())
    print("var mds_data= '{}'".format(Xdata_mds))

    correlation_matrix = []
    for i in range(0, 6):
        temp = []
        for j in range(0, 6):
            temp.append(correlation(column(X, i), column(X, j)))
        correlation_matrix.append(temp)


    Mds = MDS(metric=True, random_state=0, dissimilarity='precomputed')
    feature_transform = Mds.fit_transform(correlation_matrix)

    Xfeatures_mds = json.dumps(feature_transform.tolist())
    print("var mds_features= '{}'".format(Xfeatures_mds))

def computePCP():
    df = pd.read_csv("static/moviesdataset.csv")
    cols = ['budget', 'revenue', 'vote_average', 'vote_count', 'popularity',
            'runtime',"adult","isCollection","status"]
    data = pd.DataFrame(df[cols]).to_numpy()
    std_data = StandardScaler().fit_transform(data)

    Xtrain = pd.DataFrame(std_data, columns=["adult", "budget", "revenue", "popularity", "runtime",
                                                "vote_count", "isCollection", "vote_average", "status"])
    Xtrain["original_language"] = df["original_language"].astype('category').cat.codes
    Xtrain["adult"] = df["adult"]
    Xtrain["isCollection"] = df["isCollection"]
    Xtrain["status"] = df["status"]

    X = pd.DataFrame(Xtrain[cols]).to_numpy()

    d = json.dumps(X.tolist())
    print("var pcp_data= '{}'".format(d))


def compute_eigenvalues():
    df = pd.read_csv("static/moviesdataset.csv")
    cols =['budget','revenue','vote_average','vote_count','popularity','runtime']
    X = pd.DataFrame(df[cols]).to_numpy()
    X_std = StandardScaler().fit_transform(X)

    cov_mat = np.corrcoef(X_std.T)
    eig_vals, eig_vecs = np.linalg.eig(cov_mat)

    print('\nEigenvalues \n%s' % eig_vals)

    idx = eig_vals.argsort()[::-1]
    eigenValues = eig_vals[idx]


    pca = PCA(n_components=6)
    pca.fit(X_std)

    print(pca.components_)
    eigenVectors = pca.components_

    print('Eigenvalues \n%s' % eigenValues)
    print('\nEigenvectors \n%s' % eigenVectors)


    merge=zip(eig_vals,cols)
    z = [x for _, x in sorted(merge,reverse=True)]
    print(z)

    sum_arr=sum(eigenValues)
    sort=eigenValues
    print(sort)

    dict = [{'feature':z[i],'eigenvalue':sort[i]} for i in range(len(cols))]
    print(dict)

    sys.stdout=open('static/declare.js','w')
    jsonobj=json.dumps(dict)
    print("var eigenvalue = '{}'".format(jsonobj))

    eigvec = json.dumps(eigenVectors.tolist())
    print("var eigenvector = '{}'".format(eigvec))

    data =  json.dumps(X_std.tolist())
    print("var std_data= '{}'".format(data))

    kmeanscluster(X_std)
    compute_MDS(X_std)
    computePCP()

    sys.stdout.close()
    
    return eigenValues


@app.route("/")
def index():
    compute_eigenvalues()
    return render_template("index.html")

app.run()

