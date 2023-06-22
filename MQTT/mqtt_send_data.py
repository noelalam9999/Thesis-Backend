import paho.mqtt.client as mqtt
import json
from datetime import datetime, timedelta
import os
import django
import json
import time
import logging

# Set the DJANGO_SETTINGS_MODULE environment variable
os.environ.setdefault('DJANGO_SETTINGS_MODULE', "viserver.settings")

# Initialize the Django setup
django.setup()

from remoteunits.models import VehicleData

# Configure logging
logging.basicConfig(filename='error.log', level=logging.ERROR, format='%(asctime)s - %(levelname)s - %(message)s')

host = 'e60a7fae13a04a2b94a8f1a5811ac024.s2.eu.hivemq.cloud'
port = 8883
protocol = 'mqtts'
username = 'horen'
password = 'alam2323'
topic = 'mqtt'

last_sent_timestamp = None

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected to MQTT broker")
    else:
        print("Failed to connect, return code: ", rc)

client = mqtt.Client()

client.username_pw_set(username, password)
client.on_connect = on_connect


try:
    client.connect(host, port, 60)
    client.loop_start()

    while True:
        try:
            if last_sent_timestamp:
                vehicle_data_objects = VehicleData.objects.filter(time__gt=last_sent_timestamp)
            else:
                vehicle_data_objects = VehicleData.objects.all().order_by('-id')[:1]

            data = []

            for obj in vehicle_data_objects:
                original_time = obj.time.strftime('%Y-%m-%d %H:%M:%S')
                dt = datetime.strptime(original_time, "%Y-%m-%d %H:%M:%S")
                converted_time = dt + timedelta(hours=6)

                data.append({
                    'deviceRUid': obj.ru_id,
                    'time': converted_time.strftime('%Y-%m-%d %H:%M:%S'),
                    'horn': obj.horn,
                    'gyro': obj.gyro,
                    'gps': obj.gps
                })

            json_data = json.dumps(data)

            print("json_data", json_data)
            result, mid = client.publish(topic, json_data)

            if result == mqtt.MQTT_ERR_SUCCESS:
                print("Data published successfully")
            else:
                print("Failed to publish data with error code: " + str(result))
            break # for run one loop
            
            last_sent_timestamp = datetime.now()
            time.sleep(2)

        except Exception as e:
            logging.error(f"Error occurred while publishing data: {str(e)}")

except Exception as e:
    logging.error(f"MQTT connection error: {str(e)}")


