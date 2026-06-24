# Astro Chart Generator using PySwissEph
import pytz
from datetime import datetime
from geopy.geocoders import Nominatim
from timezonefinder import TimezoneFinder

# Try importing pyswisseph
try:
    import swisseph as swe  # Rename to swisseph if pyswisseph doesn't work
except ImportError:
    try:
        import pyswisseph as swe
    except ImportError:
        print("❌ Swiss Ephemeris not installed. Please install it using:")
        print("pip install https://github.com/astrorigin/pyswisseph/releases/download/v2.10.00/pyswisseph-2.10.00-cp311-cp311-win_amd64.whl")
        exit()

# Set ephemeris path to current directory or where .se1 files exist
swe.set_ephe_path('.')  # You can change it to swe.set_ephe_path('ephemeris/')

# Helper: Get latitude, longitude, and timezone
def get_location_data(place):
    geolocator = Nominatim(user_agent="astro-backend")
    location = geolocator.geocode(place)
    if not location:
        raise ValueError(f"📍 Could not find location: {place}")
    tf = TimezoneFinder()
    timezone_str = tf.timezone_at(lng=location.longitude, lat=location.latitude)
    return location.latitude, location.longitude, timezone_str

# Main: Generate the astrological chart
def generate_astrological_chart(date_str, time_str, place):
    lat, lon, timezone = get_location_data(place)
    tz = pytz.timezone(timezone)

    dt_local = datetime.strptime(f"{date_str} {time_str}", "%Y-%m-%d %H:%M")
    dt_local = tz.localize(dt_local)
    dt_utc = dt_local.astimezone(pytz.utc)

    jd = swe.julday(dt_utc.year, dt_utc.month, dt_utc.day, dt_utc.hour + dt_utc.minute / 60)

    planets = {
        "Sun": swe.SUN,
        "Moon": swe.MOON,
        "Mercury": swe.MERCURY,
        "Venus": swe.VENUS,
        "Mars": swe.MARS,
        "Jupiter": swe.JUPITER,
        "Saturn": swe.SATURN,
        "Rahu (North Node)": swe.TRUE_NODE
    }

    print("\n===============================")
    print(f"📅 Date: {dt_local.strftime('%Y-%m-%d')} 🕒 Time: {dt_local.strftime('%H:%M')} 🗺️ Place: {place}")
    print("===============================")
    print("\n🔭 Planetary Positions:")

    sign_names = [
        'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
        'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
    ]

    for name, planet_id in planets.items():
        position = swe.calc_ut(jd, planet_id)[0][0]
        sign = int(position / 30)
        print(f"{name:<15}: {position:6.2f}° in {sign_names[sign]}")

# Entry point
if __name__ == "__main__":
    try:
        user_date = input("Enter Date of Birth (YYYY-MM-DD): ")
        user_time = input("Enter Time of Birth (HH:MM, 24-hour): ")
        user_place = input("Enter Place of Birth (City, Country): ")

        generate_astrological_chart(user_date, user_time, user_place)
    except Exception as e:
        print("❌ Error:", e)




# # import swisseph as swe
# # import pytz
# # from geopy.geocoders import Nominatim
# # from timezonefinder import TimezoneFinder
# # from datetime import datetime

# # swe.set_ephe_path('.')  # You can specify the ephemeris data folder if needed

# # def get_timezone_coords(place):
# #     geolocator = Nominatim(user_agent="astro-ai")
# #     location = geolocator.geocode(place)
# #     tf = TimezoneFinder()
# #     timezone = tf.timezone_at(lat=location.latitude, lng=location.longitude)
# #     return location.latitude, location.longitude, timezone

# # def generate_chart_with_swiss(date_str, time_str, place):
# #     lat, lon, timezone_str = get_timezone_coords(place)
# #     timezone = pytz.timezone(timezone_str)
    
# #     local_dt = timezone.localize(datetime.strptime(f"{date_str} {time_str}", "%Y-%m-%d %H:%M"))
# #     utc_dt = local_dt.astimezone(pytz.utc)
    
# #     jd = swe.julday(utc_dt.year, utc_dt.month, utc_dt.day, utc_dt.hour + utc_dt.minute/60)

# #     print("📜 Natal Chart (Swiss Ephemeris):")
# #     for planet in [swe.SUN, swe.MOON, swe.MERCURY, swe.VENUS, swe.MARS, swe.JUPITER, swe.SATURN, swe.URANUS, swe.NEPTUNE, swe.PLUTO]:
# #         pos, _ = swe.calc_ut(jd, planet)
# #         sign_num = int(pos[0] / 30)
# #         signs = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", 
# #                  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"]
# #         print(f"{swe.get_planet_name(planet)} → {signs[sign_num]} ({pos[0]:.2f}°)")

# #     return jd  # You can pass this JD to other functions for further processing
# import swisseph as swe
# import pytz
# from datetime import datetime
# from geopy.geocoders import Nominatim
# from timezonefinder import TimezoneFinder

# # Set ephemeris path
# swe.set_ephe_path('.')

# # Helper: Get lat/lon and timezone
# def get_location_data(place):
#     geolocator = Nominatim(user_agent="astro-backend")
#     location = geolocator.geocode(place)
#     tf = TimezoneFinder()
#     timezone_str = tf.timezone_at(lng=location.longitude, lat=location.latitude)
#     return location.latitude, location.longitude, timezone_str

# # Main: Generate chart using PySwissEph
# def generate_astrological_chart(date_str, time_str, place):
#     # Get location and timezone info
#     lat, lon, timezone = get_location_data(place)
#     tz = pytz.timezone(timezone)
    
#     # Convert to UTC
#     dt_local = datetime.strptime(f"{date_str} {time_str}", "%Y-%m-%d %H:%M")
#     dt_local = tz.localize(dt_local)
#     dt_utc = dt_local.astimezone(pytz.utc)
    
#     # Julian day
#     jd = swe.julday(dt_utc.year, dt_utc.month, dt_utc.day, dt_utc.hour + dt_utc.minute / 60)

#     # Planets to analyze
#     planets = {
#         "Sun": swe.SUN,
#         "Moon": swe.MOON,
#         "Mercury": swe.MERCURY,
#         "Venus": swe.VENUS,
#         "Mars": swe.MARS,
#         "Jupiter": swe.JUPITER,
#         "Saturn": swe.SATURN,
#         "Rahu (North Node)": swe.TRUE_NODE
#     }

#     print(f"📅 Date: {dt_local.strftime('%Y-%m-%d')} 🕒 Time: {dt_local.strftime('%H:%M')} 🗺️ Place: {place}")
#     print("\n🔭 Planetary Positions:")

#     # Loop through planets
#     for name, planet_id in planets.items():
#         position = swe.calc_ut(jd, planet_id)[0][0]
#         sign = int(position / 30)
#         sign_names = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo',
#                       'Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces']
#         print(f"{name}: {position:.2f}° → {sign_names[sign]}")

# # ✨ Example: You can replace these values with user inputs
# generate_astrological_chart("1998-10-25", "14:45", "Delhi")

# import pyswisseph as swe
# import pytz
# from datetime import datetime
# from geopy.geocoders import Nominatim
# from timezonefinder import TimezoneFinder

# # Set ephemeris path
# swe.set_ephe_path('.')  
# # Or set a specific folder with ephemeris files

# # Helper: Get lat/lon and timezone
# def get_location_data(place):
#     geolocator = Nominatim(user_agent="astro-backend")
#     location = geolocator.geocode(place)
#     tf = TimezoneFinder()
#     timezone_str = tf.timezone_at(lng=location.longitude, lat=location.latitude)
#     return location.latitude, location.longitude, timezone_str

# # Main: Generate chart using PySwissEph
# def generate_astrological_chart(date_str, time_str, place):
#     # Get location and timezone info
#     lat, lon, timezone = get_location_data(place)
#     tz = pytz.timezone(timezone)
    
#     # Convert to UTC
#     dt_local = datetime.strptime(f"{date_str} {time_str}", "%Y-%m-%d %H:%M")
#     dt_local = tz.localize(dt_local)
#     dt_utc = dt_local.astimezone(pytz.utc)
    
#     # Julian day
#     jd = swe.julday(dt_utc.year, dt_utc.month, dt_utc.day, dt_utc.hour + dt_utc.minute / 60)

#     # Planets to analyze
#     planets = {
#         "Sun": swe.SUN,
#         "Moon": swe.MOON,
#         "Mercury": swe.MERCURY,
#         "Venus": swe.VENUS,
#         "Mars": swe.MARS,
#         "Jupiter": swe.JUPITER,
#         "Saturn": swe.SATURN,
#         "Rahu (North Node)": swe.TRUE_NODE
#     }

#     print(f"\n📅 Date: {dt_local.strftime('%Y-%m-%d')} 🕒 Time: {dt_local.strftime('%H:%M')} 🗺️ Place: {place}")
#     print("\n🔭 Planetary Positions:")

#     # Loop through planets
#     for name, planet_id in planets.items():
#         position = swe.calc_ut(jd, planet_id)[0][0]
#         sign = int(position / 30)
#         sign_names = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo',
#                       'Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces']
#         print(f"{name}: {position:.2f}° → {sign_names[sign]}")

# # 👉 Get user input
# if __name__ == "__main__":
#     user_date = input("Enter date of birth (YYYY-MM-DD): ")
#     user_time = input("Enter time of birth (HH:MM, 24-hour format): ")
#     user_place = input("Enter place of birth (City name): ")

#     generate_astrological_chart(user_date, user_time, user_place)
