from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psutil

app = FastAPI()

# CORS setup so frontend can talk to it
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all for now
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/stats")
def get_stats():
    cpu = psutil.cpu_percent(interval=1)
    ram = psutil.virtual_memory().percent
    battery = psutil.sensors_battery()

    # Default to N/A
    temp = "N/A"

    # Only call sensors_temperatures if it exists
    if hasattr(psutil, "sensors_temperatures"):
        try:
            temps = psutil.sensors_temperatures()
            if temps:
                for name, entries in temps.items():
                    for entry in entries:
                        if hasattr(entry, "current"):
                            temp = f"{entry.current}°C"
                            break
                    if temp != "N/A":
                        break
        except Exception as e:
            print(f"Temperature read error: {e}")
            temp = "N/A"

    return {
        "cpu": cpu,
        "ram": ram,
        "battery": {
            "percent": battery.percent if battery else "N/A",
            "plugged": battery.power_plugged if battery else False,
        },
        "temperature": temp
    }
