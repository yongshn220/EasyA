# SBU Easy-A

Summary: Website Link ::     https://sbueasya.com/
Duration: September 25, 2023 → December 31, 2023
Skills: FastAPI, MongoDB, React, Selenium

## 🖼️ Introduction

---

![screencapture-sbueasya-2023-10-13-17_29_55.png](SBU%20Easy-A%204e65da20c79c4236b5032fa6b5e6eba9/screencapture-sbueasya-2023-10-13-17_29_55.png)

<aside>
☀️ **[sbueasya](https://sbueasya.com/)** is a published website where users see **easy-A** ranking of courses in Stony Brook University!

</aside>

> Website Link
> 

[SBU Easy A](https://sbueasya.com/)

### About 1.7K views per week!

![Untitled](SBU%20Easy-A%204e65da20c79c4236b5032fa6b5e6eba9/Untitled.png)

## 🔗 Link

---

> Github
> 

[https://github.com/yongshn220/EasyA_frontend](https://github.com/yongshn220/EasyA_frontend)

[https://github.com/yongshn220/EasyA_backend](https://github.com/yongshn220/EasyA_backend)

[https://github.com/yongshn220/EasyADataGenerator](https://github.com/yongshn220/EasyADataGenerator)

> Website
> 

[SBU Easy A](https://sbueasya.com/)

## 🔧 Skills and Libraries

---

- React
- Netlify
- FastAPI
- CloudType
- Selenium
- Github Action

## 🔍 Detail

---

Stony Brook University has a website called Course Evaluation. It shows the average study time or difficulty based on the overall grade distribution data and students' opinions for each course.

**However**, this site only provides information for the specific course in the current semester and does not offer comprehensive information.

Therefore, in order for students to have a more comprehensive understanding of the difficulty level of each course, I created the Find Easy A website.

> Data Collecting
> 

Python and Selenium were used to access all courses in the school's Course Evaluation and extract the following data for each course:

1. Grade (Actual grade distribution)
2. OverallGrade (Student responded information)
3. StudyingHours (Student responded information)

The information was extracted by analyzing the HTML of each course page to retrieve the data that matches.

According to the school's course list, there are over 3000 courses. However, in reality, there are some courses that are not opened and are not listed on the Course Evaluation site, and there are also courses that exist but do not have a grade. Therefore, handling exceptions was also taken into consideration.

- Code for get course detail data. (Partial)

```python
def get_course_detail_data(driver, url):
    driver.get(url)

    html_source = driver.page_source
    chtml_source = re.sub(r'\s+', '', html_source)

    extracted_data = {}
    data_pattern = r"vardata=google.visualization.arrayToDataTable\(\[([\s\S]*?)\]\);"
    matches = re.findall(data_pattern, chtml_source)
    if matches:
        for match in matches:

            type_pattern = r"\['','(\w+)',{role:'style'}"
            type_match = re.search(type_pattern, match)
            if type_match:
                type = type_match.group(1)
                if type != "OverallGrade" and type != "Grade" and type != "StudyingHours":
                    continue
                data_pattern = r"['\"]([^'\"]+)['\"],(\d+),'#\w+'"
                data_matches = re.findall(data_pattern, match)

                if type not in extracted_data:
                    extracted_data[type] = {}
                for key, value in data_matches:
                    if type == "Grade":
                        if key in ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F', 'I', 'W']:
                            extracted_data[type][key] = value
                    else:
                        extracted_data[type][key] = value

    return extracted_data
```

Afterwards, I determined the starting year and ending year, and grouped the same classes during that period to calculate the average Grade and StudyingHours.

ex) CSE101 average grade between [2017~2023]

ex) CSE101 average grade between [2018~2023]… so on

> MongoDB
> 

I extracted data for a total of 2624 lessons.

The extracted data has been stored in Mongo DB Atlas.

![Untitled](SBU%20Easy-A%204e65da20c79c4236b5032fa6b5e6eba9/Untitled%201.png)

> Page Detail
> 

1. Filtering

![Untitled](SBU%20Easy-A%204e65da20c79c4236b5032fa6b5e6eba9/Untitled%202.png)

1. Course Ranking

![Untitled](SBU%20Easy-A%204e65da20c79c4236b5032fa6b5e6eba9/Untitled%203.png)

1. Course Detail

![Untitled](SBU%20Easy-A%204e65da20c79c4236b5032fa6b5e6eba9/Untitled%204.png)
