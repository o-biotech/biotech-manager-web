FROM mcr.microsoft.com/oss/azure-samples/azureiot-telemetrysimulator:latest
# ARG VERSION
# ENV DENO_DEPLOYMENT_ID=${VERSION}
# ENV SECURE_API_SECRET=${INPUT_SECURE_API_SECRET}

# WORKDIR /app

# COPY . .
# RUN deno cache main.ts

# EXPOSE 8000

# CMD ["run", "-A", "--unstable", "main.ts"]

RUN docker run -it -e "IotHubConnectionString=HostName=ftm-mj-rg-test-011724a-iot-hub.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=i/SwkuWtiqcN3nxrfU7TMkqB6kXu9FGT1AIoTH1GtgU=" -e Template="{ "deviceId": "$.DeviceId", "rand_int": $.Temp, "rand_double": 10, "Ticks": $.Ticks, "Counter": $.Counter, "time": "$.Time" }" -e Variables="[{name: "Temp", "random": true, "max": 25, "min": 23}, {"name":"Counter", "min":100, "max":102} ]" -e DeviceList="sim000001"