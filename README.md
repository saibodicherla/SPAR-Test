# 💡 :bulb: Purpose

Build an API that takes a personal identity number as input over HTTP and responds with information gathered from SPAR about that person which Preferably in a specific format that is easier to consume than XML.  For Instance, JSON. 

The Service should be accepts an following known 'formats' & ensure its validity:-

- 900116-6959 (10 digits with separator)

- 9001166959 (10 digits without separator, Assume person is not 100+ years old)

- 99001166959 (12 digits without separator)


# 🚚 Setting up the project

Prerequisites:- 

1. Node - *[Installation](https://nodejs.org/en/)*

***Run Locally (Installation Steps)*** 

1. Clone the repo on your local machine:

```bash
> https://github.com/saibodicherla/SPAR-Test.git
```

2.  Navigate into  SPAR-Test folder and do Node install:

```bash
> cd SPAR-Test
> node install
```

3. Run the project will appear on localhost:8000 (you can change it in the config file):

```bash
> node main.js
```

4. To use the API, send a get request on port 8000 to the IP address of the machine on which it is running. If you are testing locally for example, you can use your browser to point to the your local machine like so:

```
> http://localhost:8000/api/v1/person-information?id=[snid]
```

Where [snid] is the Swedish National ID that you want to retrieve data for.






