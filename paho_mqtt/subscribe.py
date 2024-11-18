import paho.mqtt.client as mqtt
import json
from datetime import datetime
import time
from config import MQTT_PORT, MQTT_BROKER

TOPIC_STATUS = "system/status"
TOPIC_ERROR = "system/error"
TOPIC_LEVEL = "system/level"

latest_status = "Unknown"
latest_level = 0
active_errors = []


def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected to MQTT Broker!")
        client.subscribe([
            (TOPIC_STATUS, 0),
            (TOPIC_ERROR, 0),
            (TOPIC_LEVEL, 0)
        ])
        print("Subscribed to all topics")
    else:
        print(f"Failed to connect, return code {rc}")


def on_message(client, userdata, msg):
    try:
        payload = json.loads(msg.payload.decode())
        timestamp = payload.get('timestamp', datetime.now().strftime("%Y-%m-%d %H:%M:%S"))

        if msg.topic == TOPIC_STATUS:
            handle_status_message(timestamp, payload)
        elif msg.topic == TOPIC_ERROR:
            handle_error_message(timestamp, payload)
        elif msg.topic == TOPIC_LEVEL:
            handle_level_message(timestamp, payload)

    except json.JSONDecodeError:
        print(f"Error decoding message on topic {msg.topic}")
    except Exception as e:
        print(f"Error processing message: {e}")


def handle_status_message(timestamp, payload):
    global latest_status
    status = payload.get('status')
    latest_status = status
    print(f"\n[{timestamp}] System Status: {status}")
    print_system_summary()


def handle_error_message(timestamp, payload):
    global active_errors
    error = payload.get('error')
    severity = payload.get('severity', 'UNKNOWN')

    active_errors.append({
        'timestamp': timestamp,
        'error': error,
        'severity': severity
    })

    active_errors = active_errors[-5:]

    print(f"\n[{timestamp}] Error Alert - {severity}: {error}")
    print_system_summary()


def handle_level_message(timestamp, payload):
    global latest_level
    level = payload.get('level')
    unit = payload.get('unit', '%')
    latest_level = level

    print(f"\n[{timestamp}] Level Reading: {level}{unit}")
    print_system_summary()


def print_system_summary():
    print("\n=== System Summary ===")
    print(f"Status: {latest_status}")
    print(f"Current Level: {latest_level}%")
    if active_errors:
        print("\nActive Errors:")
        for error in active_errors:
            print(f"- [{error['timestamp']}] {error['severity']}: {error['error']}")
    print("===================\n")


def main():
    client = mqtt.Client("SystemSubscriber")

    client.on_connect = on_connect
    client.on_message = on_message

    try:
        print(f"Connecting to MQTT broker at {MQTT_BROKER}")
        client.connect(MQTT_BROKER, MQTT_PORT, 60)

        client.loop_forever()

    except KeyboardInterrupt:
        print("\nExiting...")
        client.disconnect()
    except Exception as e:
        print(f"An error occurred: {e}")
        client.disconnect()


if __name__ == "__main__":
    main()