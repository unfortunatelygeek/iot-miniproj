import paho.mqtt.client as mqtt
import time
import random
import json
from datetime import datetime
from config import MQTT_PORT, MQTT_BROKER

TOPIC_STATUS = "system/status"
TOPIC_ERROR = "system/error"
TOPIC_LEVEL = "system/level"

ERROR_TYPES = [
    "Sensor not functional",
    "Low Battery Alert",
    "Connection Timeout"
]

def on_connect(client, userdata, flags, rc):
    # Callback for when the client connects to the broker
    if rc == 0:
        print("Connected to MQTT Broker!")
    else:
        print(f"Failed to connect, return code {rc}")


def on_publish(client, userdata, mid):
    print(f"Message {mid} published successfully")


def generate_system_data():
    status = random.choice(["ON", "OFF"])
    error = random.choice([None] + ERROR_TYPES) if random.random() < 0.3 else None
    level = round(random.uniform(0, 100), 2)

    return status, error, level


def main():
    client = mqtt.Client("SystemPublisher")

    client.on_connect = on_connect
    client.on_publish = on_publish

    try:
        print(f"Connecting to MQTT broker at {MQTT_BROKER}")
        client.connect(MQTT_BROKER, MQTT_PORT, 60)

        client.loop_start()

        while True:
            status, error, level = generate_system_data()
            timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

            status_data = {
                "timestamp": timestamp,
                "status": status
            }
            print(f"\nPublishing status: {status_data}")
            client.publish(TOPIC_STATUS, json.dumps(status_data))
            if error:
                error_data = {
                    "timestamp": timestamp,
                    "error": error,
                    "severity": random.choice(["LOW", "MEDIUM", "HIGH"])
                }
                print(f"Publishing error: {error_data}")
                client.publish(TOPIC_ERROR, json.dumps(error_data))

            level_data = {
                "timestamp": timestamp,
                "level": level,
                "unit": "%"
            }
            print(f"Publishing level: {level_data}")
            client.publish(TOPIC_LEVEL, json.dumps(level_data))

            time.sleep(5)

    except KeyboardInterrupt:
        print("\nExiting...")
        client.loop_stop()
        client.disconnect()
    except Exception as e:
        print(f"An error occurred: {e}")
        client.loop_stop()
        client.disconnect()


if __name__ == "__main__":
    main()