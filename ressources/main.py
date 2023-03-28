import re
import json


with open("questions.md", "r",encoding="utf-8") as file:
    content = file.read()

questions = content.split("---\n")

result = []

for question in questions:
    pattern =  r"###### (\d+)\. (.+)```(.+)```\n\n(- [A-Z]: .+\n)+.*#### Answer: ([A-Z])(.+)"
    match = re.search(pattern, question, re.DOTALL)
    
    if match:
        question_number = match.group(1)
        question_title = match.group(2)
        question_content = match.group(3)
        answers = match.group(4)
        best_answer_letter = match.group(5)
        best_answer_content = match.group(6)

        answers = answers.split("\n")
        answers = [answer.split(": ") for answer in answers if answer]
        
        answers = [{"letter": answer[0].replace('- ',''), "text": answer[1:] } for answer in answers]

        best_answer = {
            "letter": best_answer_letter,
            "text": best_answer_content
        }

        result.append({
            "questionNumber": int(question_number),
            "questionTitle": question_title,
            "questionContent": question_content,
            "answers": answers,
            "bestAnswer": best_answer

        })


# Output the JSON to a file
with open("questions.json", "w") as outfile:
    json.dump(result, outfile, indent=2)

