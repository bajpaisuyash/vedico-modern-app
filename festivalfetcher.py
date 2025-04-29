import json
from datetime import datetime

# Hardcoded list of recurring major festivals
festivals = [
    {"name": "Makar Sankranti", "month": 1, "day": 14},
    {"name": "Republic Day", "month": 1, "day": 26},
    {"name": "Maha Shivaratri", "month": 3, "day": 8},
    {"name": "Holi", "month": 3, "day": 25},
    {"name": "Ram Navami", "month": 4, "day": 17},
    {"name": "Hanuman Jayanti", "month": 4, "day": 23},
    {"name": "Raksha Bandhan", "month": 8, "day": 19},
    {"name": "Krishna Janmashtami", "month": 8, "day": 26},
    {"name": "Ganesh Chaturthi", "month": 9, "day": 7},
    {"name": "Navratri Begins", "month": 10, "day": 3},
    {"name": "Dussehra", "month": 10, "day": 12},
    {"name": "Karva Chauth", "month": 10, "day": 20},
    {"name": "Diwali", "month": 11, "day": 1},
    {"name": "Bhai Dooj", "month": 11, "day": 3},
    {"name": "Guru Nanak Jayanti", "month": 11, "day": 15},
    {"name": "Christmas", "month": 12, "day": 25}
]

# Generate multiple years' worth of festival entries
current_year = datetime.now().year
years = list(range(current_year - 2, current_year + 3))

output = []
for year in years:
    for fest in festivals:
        date_str = f"{year}-{fest['month']:02d}-{fest['day']:02d}"
        output.append({
            "date": date_str,
            "name": fest["name"]
        })

with open("festivals.json", "w", encoding="utf-8") as f:
    json.dump(output, f, indent=2, ensure_ascii=False)

print("✅ festivals.json generated with static festival list.")
