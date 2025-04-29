import json
from datetime import date
from hindu_calendar import get_festivals_for_year

# Define which festivals are considered major
MAJOR_FESTIVALS = {
    "Diwali",
    "Holi",
    "Dussehra",
    "Navratri",
    "Raksha Bandhan",
    "Janmashtami",
    "Ganesh Chaturthi",
    "Ram Navami",
    "Maha Shivaratri"
}

# Get current year and generate ±2 years of data
current_year = date.today().year
years = range(current_year - 2, current_year + 3)

all_festivals = []

for year in years:
    try:
        yearly_fests = get_festivals_for_year(year)
        for fest in yearly_fests:
            all_festivals.append({
                "date": fest["date"],
                "name": fest["name"],
                "major": fest["name"] in MAJOR_FESTIVALS
            })
    except Exception as e:
        print(f"Error fetching for {year}: {e}")

# Write to festivals.json
with open("festivals.json", "w", encoding="utf-8") as f:
    json.dump(all_festivals, f, indent=2, ensure_ascii=False)

print("✅ festivals.json created with major & minor Hindu festivals.")
