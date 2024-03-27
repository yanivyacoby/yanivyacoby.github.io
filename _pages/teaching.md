---
layout: page
permalink: /teaching
title: Teaching
nav: true
nav_order: 3
---


### CS 349: Probabilistic Foundations of ML (Fall 2024)
<hr/>

**Description:** In recent years, Artificial Intelligence has enabled applications that were previously not thought possible—from systems that propose novel drugs or generate new art/music, to systems that accurately and reliably predict outcomes of medical interventions in real-time. But what has enabled these developments? Probabilistic Machine Learning, a paradigm that casts recent advances in Machine Learning, like neural networks, into a statistical learning framework. In this course, we introduce the foundational concepts behind this paradigm—statistical model specification, and statistical learning and inference—focusing on connecting theory with real-world applications and hands-on practice. This course lays the foundation for advanced study and research in Machine Learning. Topics include: directed graphical models, deep Bayesian regression/classification, generative models (latent variable models) for clustering, dimensionality reduction, and time-series forecasting. Students will get hands-on experience building models for specific tasks, most taken from healthcare contexts, using a probabilistic programming language based in Python.

**Frequently Asked Questions:**
* What's the split between math and coding?
  > The goal behind the course is to teach the language and intuition behind probabilistic ML. On the theory side, we will therefore prioritize the math/stats required to express models, but will get less into inference/learning for these models (I'm hoping to leave this for a future course). On the programming side, we will rely heavily on [NumPyro](https://num.pyro.ai/), a [Jax](https://jax.readthedocs.io/)-based probabilistic programming language in Python, that is a little tricky to learn. The course will therefore present a balance of math and coding.
* Is this class better for students wishing to go to industry or grad school?
  > The course will set students up to be able to develop and interrogate probabilistic ML models, which can be helpful in both contexts.
* How difficult will this class be?
  > Since this is a new course, developed based on a new philosophy for teaching probabilistic ML, it is difficult to say! 
* What's the overlap with CS 305 and MIT 6.390?
  > There are several main differences between CS 349, and CS 305 and MIT 6.390. The first is that CS 305 and MIT 6.390 both take an _optimization perspective_ on ML; that is, we propose an objective/loss function that, when minimized, will give us a model that (hopefully) fits the data. In contrast, CS 349 takes a _probabilistic perspective_, which uses statistics to specify the model, and uses principles of frequentist/Bayesian learning to fit the model to data. Thus, even though there's a small number of topics that overlap, these topics will be presented from two different perspectives. Second, CS 305 and MIT 6.390 focus more on the inner workings of deep learning architectures (e.g. how convolutional vs. recurrent neural networks work), whereas in CS3 349 treats deep learning architectures abstractly as an expressive modeling tool. In CS 349, we will then use deep learning as building blocks, and work our way towards deep Bayesian regression/classification---model that can tell us how "unsure" they are about their predictions (e.g. Bayesian Neural Networks)---and deep generative models (e.g. Variational Autoencoders, Diffusion Models). 

<br/>

### CS 230: Data Structures (Fall 2024)
<hr/>

**Description:** An introduction to techniques and building blocks for organizing large programs. Topics include: modules, abstract data types, recursion, algorithmic efficiency, and the use and implementation of standard data structures and algorithms, such as lists, trees, graphs, stacks, queues, priority queues, tables, sorting, and searching. Students become familiar with these concepts through weekly programming assignments using the Java programming language. 

