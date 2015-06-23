var BleTypes = {
    //////////////////////////////////////////////////////////////////////////////
    // Indoor Localization Service
    INDOOR_LOCALIZATION_SERVICE_UUID: '7e170000-429c-41aa-83d7-d91220abeb33',
    // Indoor Localization Service - Characteristics
    CHAR_RSSI_UUID: '7e170001-429c-41aa-83d7-d91220abeb33',
    CHAR_ADD_TRACKED_DEVICE_UUID: '7e170002-429c-41aa-83d7-d91220abeb33',
    CHAR_DEVICE_SCAN_UUID: '7e170003-429c-41aa-83d7-d91220abeb33',
    CHAR_DEVICE_LIST_UUID: '7e170004-429c-41aa-83d7-d91220abeb33',
    CHAR_LIST_TRACKED_DEVICES_UUID: '7e170005-429c-41aa-83d7-d91220abeb33',
    //////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    // General Service
    GENERAL_SERVICE_UUID: 'f5f90000-59f9-11e4-aa15-123b93f75cba',
    // General Service - Characteristics
    CHAR_TEMPERATURE_UUID: 'f5f90001-59f9-11e4-aa15-123b93f75cba',
    // unused                               'f5f90002-59f9-11e4-aa15-123b93f75cba',
    // unused                               'f5f90003-59f9-11e4-aa15-123b93f75cba',
    // unused                               'f5f90004-59f9-11e4-aa15-123b93f75cba',
    CHAR_RESET_UUID: 'f5f90005-59f9-11e4-aa15-123b93f75cba',
    CHAR_MESH_UUID: 'f5f90006-59f9-11e4-aa15-123b93f75cba',
    CHAR_SET_CONFIGURATION_UUID: 'f5f90007-59f9-11e4-aa15-123b93f75cba',
    CHAR_SELECT_CONFIGURATION_UUID: 'f5f90008-59f9-11e4-aa15-123b93f75cba',
    CHAR_GET_CONFIGURATION_UUID: 'f5f90009-59f9-11e4-aa15-123b93f75cba',
    //////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    // Power Service
    POWER_SERVICE_UUID: '5b8d0000-6f20-11e4-b116-123b93f75cba',
    // Power Service - Characteristics
    CHAR_PWM_UUID: '5b8d0001-6f20-11e4-b116-123b93f75cba',
    CHAR_SAMPLE_CURRENT_UUID: '5b8d0002-6f20-11e4-b116-123b93f75cba',
    CHAR_CURRENT_CURVE_UUID: '5b8d0003-6f20-11e4-b116-123b93f75cba',
    CHAR_CURRENT_CONSUMPTION_UUID: '5b8d0004-6f20-11e4-b116-123b93f75cba',
    CHAR_CURRENT_LIMIT_UUID: '5b8d0005-6f20-11e4-b116-123b93f75cba',
    //////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    // Configuration types
    CONFIG_TYPE_NAME: 0x00,
    CONFIG_TYPE_DEVICE_TYPE: 0x01,
    CONFIG_TYPE_ROOM: 0x02,
    CONFIG_TYPE_FLOOR: 0x03,
    CONFIG_TYPE_NEARBY_TIMEOUT: 0x04,
    CONFIG_TYPE_PWM_FREQUENCY: 0x05,
    CONFIG_TYPE_IBEACON_MAJOR: 0x06,
    CONFIG_TYPE_IBEACON_MINOR: 0x07,
    CONFIG_TYPE_IBEACON_PROXIMITY_UUID: 0x08,
    CONFIG_TYPE_IBEACON_RSSI: 0x09,
    CONFIG_TYPE_WIFI: 0x0A,
    CONFIG_TYPE_TX_POWER: 0x0B,
    CONFIG_TYPE_ADV_INTERVAL: 0x0C,
    //////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    // Value set at reserved bytes for allignment
    RESERVED: 0x00,
    //////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    // Mesh messages
    CHANNEL_DATA: 0x02,
    MESH_TYPE_PWM: 0x01,
    MESH_TYPE_BEACON_CONFIG: 0x02,
    //////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    // iBeacon Identifiers
    APPLE_COMPANY_ID: 0x004c,
    IBEACON_ADVERTISEMENT_ID: 0x0215
};
/*
 * Conversions between uint8 array and uint16 or uint32
 */
var BleUtils = {
    uint16ToByteArray: function (value) {
        var u8 = new Uint8Array(2);
        u8[0] = (value >> 0 & 0xFF);
        u8[1] = (value >> 8 & 0xFF);
        return u8;
    },
    uint32ToByteArray: function (value) {
        var u8 = new Uint8Array(4);
        u8[0] = (value >> 0 & 0xFF);
        u8[1] = (value >> 8 & 0xFF);
        u8[2] = (value >> 16 & 0xFF);
        u8[3] = (value >> 24 & 0xFF);
        return u8;
    },
    byteArrayToUint32: function (u8, startIndex) {
        return (u8[startIndex + 3] << 24) + (u8[startIndex + 2] << 16) + (u8[startIndex + 1] << 8) + u8[startIndex];
    },
    byteArrayToUint16: function (u8, startIndex) {
        return (u8[startIndex + 1] << 8) + u8[startIndex];
    },
    /*
     * Conversions between uint8 array and strings
     */
    /*
     * Conversions from number to hex string
     */
    /*
     * Conversions from hex strings to number array
     */
    hexStringToByteArray: function (value) {
        var strArr = [];
        if (value.indexOf(':') > -1) {
            strArr = value.split(':');
        }
        else if (value.indexOf('-') > -1) {
            strArr = value.split('-');
        }
        else {
            for (var i = 0; i < value.length / 2; i++) {
                strArr[i] = value.slice(i * 2, i * 2 + 2);
            }
        }
        var arr = new Uint8Array(strArr.length);
        for (var i = 0; i < strArr.length; i++) {
            arr[i] = parseInt(strArr[i], 16);
        }
        return arr;
    },
    byteArrayTohexString: function (value) {
    },
    /*
     * Conversion between hex string and bluetooth address
     */
    hexStringToBluetoothAddress: function (value) {
        var arrInv = BleUtils.hexStringToByteArray(value);
        if (arrInv.length != 6) {
            return new Uint8Array(0);
        }
        var arr = new Uint8Array(6);
        for (var i = 0; i < 6; i++) {
            arr[5 - i] = arrInv[i];
        }
        return arr;
    },
    /*
     * Convert an unsigned byte to a signed byte
     */
    unsignedToSignedByte: function (value) {
        // make signed
        if (value > 127) {
            return value - 256;
        }
        else {
            return value;
        }
    },
    /*
     * Convert a signed byte to an unsigned byte
     */
    signedToUnsignedByte: function (value) {
        // make signed
        if (value < 0) {
            return value + 256;
        }
        else {
            return value;
        }
    },
    /*
     * Convert an unsigned byte to 2 digit hex string
     */
    uint8toHexString: function (nbr) {
        var str = nbr.toString(16);
        return str.length < 2 ? '0' + str : str;
    },
    /*
     * Convert a byte array to uuid string
     */
    bytesToUuid: function (bytes) {
        var separatorList = [4, 6, 8, 10];
        var uuid = "";
        for (var i = 0; i < bytes.length; ++i) {
            if (separatorList.indexOf(i) >= 0) {
                uuid += "-";
            }
            uuid += BleUtils.uint8toHexString(bytes[i]);
        }
        return uuid;
    },
    /*
     * Convert a uuid string to byte array
     */
    uuidToBytes: function (uuid) {
        if (uuid.length != 16 * 2 + 4)
            return new Uint8Array(0);
        var bytes = [];
        for (var i = 0; i < uuid.length;) {
            if (uuid[i] != '-') {
                bytes.push(parseInt(uuid[i] + uuid[i + 1], 16));
                i += 2;
            }
            else {
                i++;
            }
        }
        return new Uint8Array(bytes);
    }
};
/// <reference path="ble-types.ts"/>
/// <reference path="ble-utils.ts"/>
var BleConfigurationMessage = (function () {
    function BleConfigurationMessage() {
    }
    return BleConfigurationMessage;
})();
var BleBase = function () {
    var self = this;
    var addressKey = 'address';
    var dobotsCompanyId = 0x1111; // has to be defined, this is only a dummy value
    var scanTimer = null;
    var connectTimer = null;
    var reconnectTimer = null;
    var iOSPlatform = "iOS";
    var androidPlatform = "Android";
    self.init = function (callback) {
        console.log("Initialize BLE hardware");
        bluetoothle.initialize(function (obj) {
            console.log('Properly connected to BLE chip');
            // console.log("Message " + JSON.stringify(obj));
            if (obj.status == 'enabled') {
                callback(true);
            }
        }, function (obj) {
            console.log('Connection to BLE chip failed');
            console.log('Message' + obj.status);
            navigator.notification.alert('Bluetooth is not turned on, or could not be turned on. Make sure your phone has a Bluetooth 4.+ (BLE) chip.', null, 'BLE off?', 'Sorry!');
            callback(false);
        }, { "request": true });
    };
    self.isConnected = function (address) {
        if (!address)
            return false;
        var paramsObj = { "address": address };
        var connected;
        bluetoothle.isConnected(connected, paramsObj);
        return connected;
    };
    self.reconnectDevice = function (address, timeout, callback) {
        console.log("Beginning to reconnect to " + address + " with " + timeout + " second timeout");
        var paramsObj = { "address": address };
        bluetoothle.reconnect(function (obj) {
            if (obj.status == "connected") {
                console.log("Reconnected to: " + obj.name + " - " + obj.address);
                self.clearReconnectTimeout();
                if (callback) {
                    callback(true);
                }
            }
            else if (obj.status == "connecting") {
                console.log("Reconnecting to: " + obj.name + " - " + obj.address);
            }
            else {
                console.log("Unexpected reconnect status: " + obj.status);
                self.clearReconnectTimeout();
                self.closeDevice(obj.address);
                if (callback) {
                    callback(false);
                }
            }
        }, function (obj) {
            console.log("Reconnect error: " + obj.error + " - " + obj.message);
            self.clearReconnectTimeout();
            if (callback) {
                callback(false);
            }
        }, paramsObj);
        self.reconnectTimer = setTimeout(function () {
            console.log('Connection timed out, stop connection attempts');
            if (callback) {
                callback(false);
            }
        }, timeout * 1000);
    };
    self.clearReconnectTimeout = function () {
        console.log("Clearing reconnect timeout");
        if (self.reconnectTimer != null) {
            clearTimeout(self.reconnectTimer);
        }
    };
    self.connectDevice = function (address, timeout, callback) {
        console.log("Beginning to connect to " + address + " with " + timeout + " second timeout");
        var paramsObj = { "address": address };
        bluetoothle.connect(function (obj) {
            if (obj.status == "connected") {
                console.log("Connected to: " + obj.name + " [" + obj.address + "]");
                self.clearConnectTimeout();
                if (callback) {
                    callback(true);
                }
            }
            else if (obj.status == "connecting") {
                console.log("Connecting to: " + obj.name + " [" + obj.address + "]");
            }
            else {
                console.log("Unexpected connect status: " + obj.status);
                self.clearConnectTimeout();
                self.closeDevice(obj.address);
                if (callback) {
                    callback(false);
                }
            }
        }, function (obj) {
            console.log("Connect error: " + obj.error + " - " + obj.message);
            // for now we are gonna attempt a reconnect
            if (obj.error == 'connect') {
                // console.log("Attempt a disconnect, a reconnect didn't work");
                //	self.reconnectDevice(address, timeout, callback);
                // self.disconnectDevice(address);
                console.log("close device, try again...");
                self.closeDevice(address);
            }
            else {
                self.clearConnectTimeout();
                if (callback) {
                    callback(false);
                }
            }
        }, paramsObj);
        self.connectTimer = setTimeout(function () {
            console.log('Connection timed out, stop connection attempts');
            if (callback) {
                callback(false);
            }
        }, timeout * 1000);
    };
    self.clearConnectTimeout = function () {
        console.log("Clearing connect timeout");
        if (self.connectTimer != null) {
            clearTimeout(self.connectTimer);
        }
    };
    /** Discovery of services and characteristics on the target device (crownstone).
     *
     * Discovery must be run before any of the getters/setters can be used. Or else "Service not found" errors
     * will be generated.
     */
    self.discoverServices = function (address, callback, successCB, errorCB) {
        console.log("Beginning discovery of services for device" + address);
        var paramsObj = { address: address };
        bluetoothle.discover(function (obj) {
            if (obj.status == "discovered") {
                console.log("Discovery completed");
                if (callback) {
                    var services = obj.services;
                    for (var i = 0; i < services.length; ++i) {
                        var serviceUuid = services[i].serviceUuid;
                        var characteristics = services[i].characteristics;
                        for (var j = 0; j < characteristics.length; ++j) {
                            var characteristicUuid = characteristics[j].characteristicUuid;
                            console.log("Found service " + serviceUuid + " with characteristic " + characteristicUuid);
                            callback(serviceUuid, characteristicUuid);
                        }
                    }
                }
                if (successCB)
                    successCB(obj);
            }
            else {
                var msg = "Unexpected discover status: " + obj.status;
                if (errorCB)
                    errorCB(msg);
            }
        }, function (obj) {
            var msg = "Discover error: " + obj.error + " - " + obj.message;
            if (errorCB)
                errorCB(msg);
        }, paramsObj);
    };
    self.discoverCharacteristic = function (address, serviceUuid, characteristicUuid, callback, errorCB) {
        var paramsObj = { address: address };
        bluetoothle.discover(function (obj) {
            if (obj.status == "discovered") {
                var services = obj.services;
                var success = false;
                for (var i = 0; i < services.length; ++i) {
                    var sUuid = services[i].serviceUuid;
                    if (sUuid != serviceUuid)
                        continue;
                    var characteristics = services[i].characteristics;
                    for (var j = 0; j < characteristics.length; ++j) {
                        var cUuid = characteristics[j].characteristicUuid;
                        if (cUuid != characteristicUuid)
                            continue;
                        success = true;
                        if (success)
                            break;
                    }
                    if (success)
                        break;
                }
                if (success) {
                    callback(serviceUuid, characteristicUuid);
                }
                else {
                    var msg = "Could not find service " + serviceUuid +
                        " or characteristic " + characteristicUuid;
                    errorCB(msg);
                }
            }
            else {
                var msg = "Unexpected discover status: " + obj.status;
                errorCB(msg);
            }
        }, function (obj) {
            var msg = "Discover error: " + obj.error + " - " + obj.message;
            errorCB(msg);
        }, paramsObj);
    };
    self.startEndlessScan = function (callback) {
        console.log('Start endless scan');
        var paramsObj = {};
        bluetoothle.startScan(function (obj) {
            if (obj.status == 'scanResult') {
                // console.log('Found device, parse and call callback if company id == ' + dobotsCompanyId);
                var arr = bluetoothle.encodedStringToBytes(obj.advertisement);
                self.parseAdvertisement(arr, 0xFF, function (data) {
                    var companyId = BleUtils.byteArrayToUint16(data, 0);
                    if (companyId == BleTypes.APPLE_COMPANY_ID) {
                        self.parseIBeaconData(obj, data);
                    }
                    if (companyId == dobotsCompanyId) {
                        obj.isCrownstone = true;
                    }
                    callback(obj);
                });
            }
            else if (obj.status == 'scanStarted') {
                console.log('Endless scan was started successfully');
            }
            else {
                console.log('Unexpected start scan status: ' + obj.status);
                console.log('Stopping scan');
                self.stopEndlessScan();
            }
        }, function (obj) {
            console.log('Scan error, status: ' + obj.status);
            // navigator.notification.alert(
            // 		'Scan Error',
            // 		null,
            // 		'Status',
            // 		'Sorry!');
        }, paramsObj);
    };
    self.stopEndlessScan = function () {
        //console.log("stop endless scan...");
        bluetoothle.stopScan(function (obj) {
            if (obj.status == 'scanStopped') {
            }
            else {
                console.log('Unexpected stop scan status: ' + obj.status);
            }
        }, function (obj) {
            console.log('Stop scan error: ' + obj.error + ' - ' + obj.message);
        });
    };
    self.parseAdvertisement = function (obj, search, callback) {
        //var start = 0;
        //var end = obj.length;
        for (var i = 0; i < obj.length;) {
            var el_len = obj[i];
            var el_type = obj[i + 1];
            if (el_type == search) {
                var begin = i + 2;
                var end = begin + el_len - 1;
                var el_data = obj.subarray(begin, end);
                callback(el_data);
                return;
            }
            else if (el_type == 0) {
                // console.log(search.toString(16) + " not found!");
                return;
            }
            else {
                i += el_len + 1;
            }
        }
    };
    self.parseIBeaconData = function (obj, data) {
        var companyId = data[0] | data[1] << 8; // little endian
        var advertisementId = data[2] << 8 | data[3]; // big endian
        if (companyId == BleTypes.APPLE_COMPANY_ID && advertisementId == BleTypes.IBEACON_ADVERTISEMENT_ID) {
            obj.isIBeacon = true;
            obj.proximityUuid = BleUtils.bytesToUuid(data.subarray(4, 20));
            obj.major = data[20] << 8 | data[21]; // big endian
            obj.minor = data[22] << 8 | data[23]; // big endian
            // make signed
            obj.calibratedRssi = BleUtils.unsignedToSignedByte(data[24]);
        }
        else {
            obj.isIBeacon = false;
        }
    };
    /*
     * Contains bug: when a device is in "disconnecting" state, it will never be closed.
     */
    self.disconnectDevice = function (address, successCB, errorCB) {
        var paramsObj = { "address": address };
        bluetoothle.disconnect(function (obj) {
            if (obj.status == "disconnected") {
                console.log("Device " + obj.address + " disconnected");
                self.closeDevice(obj.address);
                if (successCB)
                    successCB();
            }
            else if (obj.status == "disconnecting") {
                console.log("Disconnecting device " + obj.address);
            }
            else {
                console.log("Unexpected disconnect status from device " + obj.address + ": " + obj.status);
                if (errorCB)
                    errorCB();
            }
        }, function (obj) {
            console.log("Disconnect error from device " + obj.address + ": " + obj.error + " - " + obj.message);
            if (errorCB)
                errorCB();
        }, paramsObj);
    };
    self.closeDevice = function (address) {
        var paramsObj = { "address": address };
        bluetoothle.close(function (obj) {
            if (obj.status == "closed") {
                console.log("Device " + obj.address + " closed");
            }
            else {
                console.log("Unexpected close status from device " + obj.address + ": " + obj.status);
            }
        }, function (obj) {
            console.log("Close error from device " + obj.address + ": " + obj.error + " - " + obj.message);
        }, paramsObj);
    };
    self.readTemperature = function (address, callback) {
        console.log("Read temperature at service " + BleTypes.GENERAL_SERVICE_UUID + ' and characteristic ' + BleTypes.CHAR_TEMPERATURE_UUID);
        var paramsObj = { "address": address, "serviceUuid": BleTypes.GENERAL_SERVICE_UUID, "characteristicUuid": BleTypes.CHAR_TEMPERATURE_UUID };
        bluetoothle.read(function (obj) {
            if (obj.status == "read") {
                var temperature = bluetoothle.encodedStringToBytes(obj.value);
                console.log("temperature: " + temperature[0]);
                callback(temperature[0]);
            }
            else {
                console.log("Unexpected read status: " + obj.status);
                self.disconnectDevice(address);
            }
        }, function (obj) {
            console.log('Error in reading temperature: ' + obj.error + " - " + obj.message);
        }, paramsObj);
    };
    self.scanDevices = function (address, scan) {
        var u8 = new Uint8Array(1);
        u8[0] = scan ? 1 : 0;
        var v = bluetoothle.bytesToEncodedString(u8);
        console.log("Write " + v + " at service " + BleTypes.INDOOR_LOCALIZATION_SERVICE_UUID + ' and characteristic ' + BleTypes.CHAR_DEVICE_SCAN_UUID);
        var paramsObj = { "address": address, "serviceUuid": BleTypes.INDOOR_LOCALIZATION_SERVICE_UUID, "characteristicUuid": BleTypes.CHAR_DEVICE_SCAN_UUID, "value": v };
        bluetoothle.write(function (obj) {
            if (obj.status == 'written') {
                console.log('Successfully written to device scan characteristic - ' + obj.status);
            }
            else {
                console.log('Writing to device scan characteristic was not successful' + obj);
            }
        }, function (obj) {
            console.log("Error in writing device scan characteristic: " + obj.error + " - " + obj.message);
        }, paramsObj);
    };
    self.listDevices = function (address, callback) {
        console.log("Read device list at service " + BleTypes.INDOOR_LOCALIZATION_SERVICE_UUID + ' and characteristic ' + BleTypes.CHAR_DEVICE_LIST_UUID);
        var paramsObj = { "address": address, "serviceUuid": BleTypes.INDOOR_LOCALIZATION_SERVICE_UUID, "characteristicUuid": BleTypes.CHAR_DEVICE_LIST_UUID };
        bluetoothle.read(function (obj) {
            if (obj.status == "read") {
                var list = bluetoothle.encodedStringToBytes(obj.value);
                console.log("list: " + list[0]);
                callback(list);
            }
            else {
                console.log("Unexpected read status: " + obj.status);
                self.disconnectDevice(address);
            }
        }, function (obj) {
            console.log('Error in reading device list: ' + obj.error + " - " + obj.message);
        }, paramsObj);
    };
    self.writePWM = function (address, value, successCB, errorCB) {
        var u8 = new Uint8Array(1);
        u8[0] = value;
        var v = bluetoothle.bytesToEncodedString(u8);
        console.log("Write " + v + " at service " + BleTypes.POWER_SERVICE_UUID + ' and characteristic ' + BleTypes.CHAR_PWM_UUID);
        var paramsObj = { "address": address, "serviceUuid": BleTypes.POWER_SERVICE_UUID, "characteristicUuid": BleTypes.CHAR_PWM_UUID, "value": v };
        bluetoothle.write(function (obj) {
            if (obj.status == 'written') {
                console.log('Successfully written to pwm characteristic - ' + obj.status);
                if (successCB)
                    successCB();
            }
            else {
                console.log('Writing to pwm characteristic was not successful' + obj);
                if (errorCB)
                    errorCB();
            }
        }, function (obj) {
            console.log("Error in writing to pwm characteristic: " + obj.error + " - " + obj.message);
            if (errorCB)
                errorCB();
        }, paramsObj);
    };
    // TODO: should have errorCB
    self.readPWM = function (address, callback) {
        console.log("Read current consumption at service " + BleTypes.POWER_SERVICE_UUID + ' and characteristic ' + BleTypes.CHAR_PWM_UUID);
        var paramsObj = { "address": address, "serviceUuid": BleTypes.POWER_SERVICE_UUID, "characteristicUuid": BleTypes.CHAR_PWM_UUID };
        bluetoothle.read(function (obj) {
            if (obj.status == "read") {
                var pwm = bluetoothle.encodedStringToBytes(obj.value);
                console.log("pwm: " + pwm[0]);
                callback(pwm[0]);
            }
            else {
                console.log("Unexpected read status: " + obj.status);
                self.disconnectDevice(address);
            }
        }, function (obj) {
            console.log('Error in reading current consumption: ' + obj.error + " - " + obj.message);
        }, paramsObj);
    };
    // TODO: should have errorCB
    self.readCurrentConsumption = function (address, callback) {
        console.log("Read current consumption at service " + BleTypes.POWER_SERVICE_UUID + ' and characteristic ' + BleTypes.CHAR_CURRENT_CONSUMPTION_UUID);
        var paramsObj = { "address": address, "serviceUuid": BleTypes.POWER_SERVICE_UUID, "characteristicUuid": BleTypes.CHAR_CURRENT_CONSUMPTION_UUID };
        bluetoothle.read(function (obj) {
            if (obj.status == "read") {
                var currentConsumption = bluetoothle.encodedStringToBytes(obj.value);
                console.log("currentConsumption: " + currentConsumption[0]);
                callback(currentConsumption[0]);
            }
            else {
                console.log("Unexpected read status: " + obj.status);
                self.disconnectDevice(address);
            }
        }, function (obj) {
            console.log('Error in reading current consumption: ' + obj.error + " - " + obj.message);
        }, paramsObj);
    };
    // TODO: should have errorCB
    self.sampleCurrent = function (address, value, callback) {
        var u8 = new Uint8Array(1);
        u8[0] = value;
        var v = bluetoothle.bytesToEncodedString(u8);
        console.log("Write " + v + " at service " + BleTypes.POWER_SERVICE_UUID + ' and characteristic ' + BleTypes.CHAR_SAMPLE_CURRENT_UUID);
        var paramsObj = { "address": address, "serviceUuid": BleTypes.POWER_SERVICE_UUID, "characteristicUuid": BleTypes.CHAR_SAMPLE_CURRENT_UUID, "value": v };
        bluetoothle.write(function (obj) {
            if (obj.status == 'written') {
                console.log('Successfully written to sample current characteristic - ' + obj.status);
                if (callback) {
                    callback(true);
                }
            }
            else {
                console.log('Writing to sample current characteristic was not successful' + obj);
                if (callback) {
                    callback(false);
                }
            }
        }, function (obj) {
            console.log("Error in writing to sample current characteristic: " + obj.error + " - " + obj.message);
            if (callback) {
                callback(false);
            }
        }, paramsObj);
    };
    // TODO: should have errorCB
    self.getCurrentCurve = function (address, callback) {
        console.log("Read current curve at service " + BleTypes.POWER_SERVICE_UUID + ' and characteristic ' + BleTypes.CHAR_CURRENT_CURVE_UUID);
        var paramsObj = { "address": address, "serviceUuid": BleTypes.POWER_SERVICE_UUID, "characteristicUuid": BleTypes.CHAR_CURRENT_CURVE_UUID };
        bluetoothle.read(function (obj) {
            if (obj.status == "read") {
                var arr8 = bluetoothle.encodedStringToBytes(obj.value);
                console.log(JSON.stringify(arr8));
                if (arr8.length < 2) {
                    console.log("Invalid current curve data (too short): ");
                    console.log(JSON.stringify(arr8));
                    return;
                }
                callback(arr8);
            }
            else {
                console.log("Unexpected read status: " + obj.status);
                self.disconnectDevice(address);
            }
        }, function (obj) {
            console.log('Error in reading current curve: ' + obj.error + " - " + obj.message);
        }, paramsObj);
    };
    /* set floor to value
     */
    self.setFloor = function (address, value, successCB, errorCB) {
        //var configuration = {};
        var configuration = new BleConfigurationMessage;
        configuration.type = BleTypes.CONFIG_TYPE_FLOOR;
        configuration.length = 1;
        configuration.payload = new Uint8Array([value]);
        self.writeConfiguration(address, configuration, successCB, errorCB);
    };
    /** Get a floor from the connected device
     */
    self.getFloor = function (address, successCB, errorCB) {
        self.getConfiguration(address, BleTypes.CONFIG_TYPE_FLOOR, function (configuration) {
            if (configuration.length != 1) {
                var msg = "Configuration value for floor level should have length 1";
                if (errorCB)
                    errorCB(msg);
            }
            else {
                var floor = configuration.payload[0];
                console.log("Floor is set to: " + floor);
                if (successCB)
                    successCB(floor);
            }
        }, errorCB);
    };
    // TODO: should be writeWifi()
    /* Set Wifi SSID and password
     */
    self.setWifi = function (address, value, successCB, errorCB) {
        var u8;
        if (value != "") {
            u8 = bluetoothle.stringToBytes(value);
        }
        else {
            var msg = "Value shouldn't be empty";
            if (errorCB)
                errorCB(msg);
        }
        //var configuration = {};
        var configuration = new BleConfigurationMessage;
        configuration.type = BleTypes.CONFIG_TYPE_WIFI;
        configuration.length = value.length; // TODO: should be u8.length?
        configuration.payload = u8;
        console.log("Send payload: " + u8);
        self.writeConfiguration(address, configuration, successCB, errorCB);
    };
    /*
     * Set the transmission power
     * Can be: -30, -20, -16, -12, -8, -4, 0, or 4
     */
    self.setTxPower = function (address, value, successCB, errorCB) {
        console.log("set TX power to " + value);
        var configuration = new BleConfigurationMessage;
        configuration.type = BleTypes.CONFIG_TYPE_TX_POWER;
        configuration.length = 1;
        configuration.payload = new Uint8Array([value]);
        self.writeConfiguration(address, configuration, successCB, errorCB);
    };
    /*
     * Get the transmission power
     */
    self.getTxPower = function (address, successCB, errorCB) {
        self.getConfiguration(address, BleTypes.CONFIG_TYPE_TX_POWER, function (configuration) {
            if (configuration.length != 1) {
                var msg = "Configuration value for tx power should have length 1";
                if (errorCB)
                    errorCB(msg);
            }
            else {
                var txPower = BleUtils.unsignedToSignedByte(configuration.payload[0]);
                console.log("TX power is set to: " + txPower);
                if (successCB)
                    successCB(txPower);
            }
        }, errorCB);
    };
    /*
     * Set the advertisement interval (in ms)
     */
    self.setAdvertisementInterval = function (address, value, successCB, errorCB) {
        console.log("set advertisement interval to " + value);
        value = Math.floor(value / 0.625);
        var configuration = new BleConfigurationMessage;
        configuration.type = BleTypes.CONFIG_TYPE_ADV_INTERVAL;
        configuration.length = 2;
        configuration.payload = BleUtils.uint16ToByteArray(value);
        self.writeConfiguration(address, configuration, successCB, errorCB);
    };
    /*
     * Get the advertisement interval (in ms)
     */
    self.getAdvertisementInterval = function (address, successCB, errorCB) {
        self.getConfiguration(address, BleTypes.CONFIG_TYPE_ADV_INTERVAL, function (configuration) {
            if (configuration.length != 2) {
                var msg = "Configuration value for advertisement interval should have length 2";
                if (errorCB)
                    errorCB(msg);
            }
            else {
                var interval = BleUtils.byteArrayToUint16(configuration.payload, 0) * 0.625;
                console.log("Advertisement interval is set to: " + interval);
                if (successCB)
                    successCB(interval);
            }
        }, errorCB);
    };
    /*
     * Set the major value for beacon
     */
    self.setBeaconMajor = function (address, value, successCB, errorCB) {
        console.log("set major to " + value);
        //var configuration = {};
        var configuration = new BleConfigurationMessage;
        configuration.type = BleTypes.CONFIG_TYPE_IBEACON_MAJOR;
        configuration.length = 2;
        configuration.payload = BleUtils.uint16ToByteArray(value);
        self.writeConfiguration(address, configuration, successCB, errorCB);
    };
    /*
     * Get the major value of the beacon
     */
    self.getBeaconMajor = function (address, successCB, errorCB) {
        self.getConfiguration(address, BleTypes.CONFIG_TYPE_IBEACON_MAJOR, function (configuration) {
            if (configuration.length > 2) {
                var msg = "Configuration value for major should have length 2";
                if (errorCB)
                    errorCB(msg);
            }
            else {
                var major = BleUtils.byteArrayToUint16(configuration.payload, 0);
                console.log("Major is set to: " + major);
                if (successCB)
                    successCB(major);
            }
        }, errorCB);
    };
    /*
     * Set the minor value of the beacon
     */
    self.setBeaconMinor = function (address, value, successCB, errorCB) {
        console.log("set minor to " + value);
        //var configuration = {};
        var configuration = new BleConfigurationMessage;
        configuration.type = BleTypes.CONFIG_TYPE_IBEACON_MINOR;
        configuration.length = 2;
        configuration.payload = BleUtils.uint16ToByteArray(value);
        self.writeConfiguration(address, configuration, successCB, errorCB);
    };
    /*
     * Get the minor value of the beacon
     */
    self.getBeaconMinor = function (address, successCB, errorCB) {
        self.getConfiguration(address, BleTypes.CONFIG_TYPE_IBEACON_MINOR, function (configuration) {
            if (configuration.length > 2) {
                var msg = "Configuration value for minor should have length 2";
                if (errorCB)
                    errorCB(msg);
            }
            else {
                var minor = BleUtils.byteArrayToUint16(configuration.payload, 0);
                console.log("Minor is set to: " + minor);
                if (successCB)
                    successCB(minor);
            }
        }, errorCB);
    };
    /*
     * Get the calibrated rssi at 1m of the beacon
     */
    self.setBeaconCalibratedRssi = function (address, value, successCB, errorCB) {
        console.log("set rssi to " + value);
        //var configuration = {};
        var configuration = new BleConfigurationMessage;
        configuration.type = BleTypes.CONFIG_TYPE_IBEACON_RSSI;
        configuration.length = 1;
        configuration.payload = new Uint8Array([value]);
        self.writeConfiguration(address, configuration, successCB, errorCB);
    };
    /*
     * Set the calibrated rssi at 1 m of the beacon
     */
    self.getBeaconCalibratedRssi = function (address, successCB, errorCB) {
        self.getConfiguration(address, BleTypes.CONFIG_TYPE_IBEACON_RSSI, function (configuration) {
            if (configuration.length > 1) {
                var msg = "Configuration value for rssi should have length 1";
                if (errorCB)
                    errorCB(msg);
            }
            else {
                var rssi = BleUtils.unsignedToSignedByte(configuration.payload[0]);
                console.log("Rssi is set to: " + rssi);
                if (successCB)
                    successCB(rssi);
            }
        }, errorCB);
    };
    /*
     * Set the proximity UUID of the beacon
     */
    self.setBeaconProximityUuid = function (address, value, successCB, errorCB) {
        console.log("set proximity uuid to " + value);
        //var configuration = {};
        var configuration = new BleConfigurationMessage;
        configuration.type = BleTypes.CONFIG_TYPE_IBEACON_PROXIMITY_UUID;
        configuration.payload = BleUtils.uuidToBytes(value);
        configuration.length = configuration.payload.length;
        self.writeConfiguration(address, configuration, successCB, errorCB);
    };
    /*
     * Get the proximity UUID of the beacon
     */
    self.getBeaconProximityUuid = function (address, successCB, errorCB) {
        self.getConfiguration(address, BleTypes.CONFIG_TYPE_IBEACON_PROXIMITY_UUID, function (configuration) {
            if (configuration.length > 16) {
                var msg = "Configuration value for proximity uuid should have length 16";
                if (errorCB)
                    errorCB(msg);
            }
            else {
                var uuid = BleUtils.bytesToUuid(configuration.payload);
                console.log("Uuid is set to: " + uuid);
                if (successCB)
                    successCB(uuid);
            }
        }, errorCB);
    };
    /*
     * Set the device name
     */
    self.setDeviceName = function (address, value, successCB, errorCB) {
        console.log("set name to " + value);
        //var configuration = {};
        var configuration = new BleConfigurationMessage;
        configuration.type = BleTypes.CONFIG_TYPE_NAME;
        configuration.payload = bluetoothle.stringToBytes(value);
        configuration.length = configuration.payload.length;
        self.writeConfiguration(address, configuration, successCB, errorCB);
    };
    /*
     * Get the device name
     */
    self.getDeviceName = function (address, successCB, errorCB) {
        self.getConfiguration(address, BleTypes.CONFIG_TYPE_NAME, function (configuration) {
            if (configuration.length == 0) {
                if (errorCB)
                    errorCB("received empty name");
            }
            else {
                var name = bluetoothle.bytesToString(configuration.payload);
                console.log("Name is set to: " + name);
                if (successCB)
                    successCB(name);
            }
        }, errorCB);
    };
    /*
     * Set the device type
     */
    self.setDeviceType = function (address, value, successCB, errorCB) {
        console.log("set device type to " + value);
        //var configuration = {};
        var configuration = new BleConfigurationMessage;
        configuration.type = BleTypes.CONFIG_TYPE_DEVICE_TYPE;
        configuration.payload = new Uint8Array([value]);
        configuration.length = configuration.payload.length;
        self.writeConfiguration(address, configuration, successCB, errorCB);
    };
    /*
     * Get the device type
     */
    self.getDeviceType = function (address, successCB, errorCB) {
        self.getConfiguration(address, BleTypes.CONFIG_TYPE_DEVICE_TYPE, function (configuration) {
            if (configuration.length > 1) {
                var msg = "Configuration value for device type should have length 1";
                if (errorCB)
                    errorCB(msg);
            }
            else {
                var deviceType = configuration.payload[0];
                console.log("Device type is set to: " + deviceType);
                if (successCB)
                    successCB(deviceType);
            }
        }, errorCB);
    };
    /*
     * Set the room
     */
    self.setRoom = function (address, value, successCB, errorCB) {
        console.log("set room to " + value);
        //var configuration = {};
        var configuration = new BleConfigurationMessage;
        configuration.type = BleTypes.CONFIG_TYPE_ROOM;
        configuration.payload = new Uint8Array([value]);
        configuration.length = configuration.payload.length;
        self.writeConfiguration(address, configuration, successCB, errorCB);
    };
    /*
     * Get the room
     */
    self.getRoom = function (address, successCB, errorCB) {
        self.getConfiguration(address, BleTypes.CONFIG_TYPE_ROOM, function (configuration) {
            if (configuration.length > 1) {
                var msg = "Configuration value for room should have length 1";
                if (errorCB)
                    errorCB(msg);
            }
            else {
                var room = configuration.payload[0];
                console.log("Room is set to: " + room);
                if (successCB)
                    successCB(room);
            }
        }, errorCB);
    };
    /** Select and read configuration
     */
    self.getConfiguration = function (address, configurationType, successCB, errorCB) {
        self.selectConfiguration(address, configurationType, function () {
            // we need to give the crownstone some time to write the value to the
            // getConfigurationCharacteristic
            setTimeout(function () {
                self.readConfiguration(address, successCB, errorCB);
            }, 50);
        }, errorCB);
    };
    /** Get a specific configuration, selected before in selectConfiguration
     */
    self.readConfiguration = function (address, successCB, errorCB) {
        console.log("Read configuration at service " + BleTypes.GENERAL_SERVICE_UUID +
            ' and characteristic ' + BleTypes.CHAR_GET_CONFIGURATION_UUID);
        var paramsObj = { "address": address, "serviceUuid": BleTypes.GENERAL_SERVICE_UUID,
            "characteristicUuid": BleTypes.CHAR_GET_CONFIGURATION_UUID };
        bluetoothle.read(function (obj) {
            if (obj.status == "read") {
                var bytearray = bluetoothle.encodedStringToBytes(obj.value);
                //var configuration = {};
                var configuration = new BleConfigurationMessage;
                configuration.type = bytearray[0];
                configuration.length = BleUtils.byteArrayToUint16(bytearray, 2);
                configuration.payload = new Uint8Array(configuration.length);
                for (var i = 0; i < configuration.length; i++) {
                    configuration.payload[i] = bytearray[i + 4];
                }
                console.log("Read configuration: " + JSON.stringify(configuration));
                if (successCB)
                    successCB(configuration);
            }
            else {
                var msg = "Unexpected read status: " + obj.status;
                console.log(msg);
                if (errorCB)
                    errorCB();
            }
        }, function (obj) {
            var msg = 'Error in reading "get configuration" characteristic' +
                obj.error + " - " + obj.message;
            console.log(msg);
            if (errorCB)
                errorCB(msg);
        }, paramsObj);
    };
    /** Writing a configuration
     *
     */
    self.writeConfiguration = function (address, configuration, successCB, errorCB) {
        console.log("Write to " + address + " configuration type " + configuration.type);
        // build up a single byte array, prepending payload with type and payload length, preamble size is 4
        var u8 = new Uint8Array(configuration.length + 4);
        u8[0] = configuration.type;
        u8[1] = BleTypes.RESERVED;
        u8[2] = (configuration.length & 0xFF); // endianness: least significant byte first
        u8[3] = ((configuration.length >> 8) & 0xFF);
        u8.set(configuration.payload, 4);
        var v = bluetoothle.bytesToEncodedString(u8);
        console.log("Write " + v + " at service " + BleTypes.GENERAL_SERVICE_UUID +
            ' and characteristic ' + BleTypes.CHAR_SET_CONFIGURATION_UUID);
        var paramsObj = { "address": address, "serviceUuid": BleTypes.GENERAL_SERVICE_UUID,
            "characteristicUuid": BleTypes.CHAR_SET_CONFIGURATION_UUID, "value": v };
        bluetoothle.write(function (obj) {
            if (obj.status == 'written') {
                var msg = 'Successfully written to "write configuration" characteristic - ' +
                    obj.status;
                console.log(msg);
                if (successCB)
                    setTimeout(function () { successCB(msg); }, 500);
            }
            else {
                var msg = 'Error in writing to "write configuration" characteristic - ' +
                    obj;
                console.log(msg);
                if (errorCB)
                    errorCB(msg);
            }
        }, function (obj) {
            var msg = 'Error in writing to "write configuration" characteristic - ' +
                obj.error + " - " + obj.message;
            console.log(msg);
            if (errorCB)
                errorCB(msg);
        }, paramsObj);
    };
    /** Before getting the value of a specific configuration type, we have to select it.
     */
    self.selectConfiguration = function (address, configurationType, successCB, errorCB) {
        var u8 = new Uint8Array(1);
        u8[0] = configurationType;
        var v = bluetoothle.bytesToEncodedString(u8);
        console.log("Write " + v + " at service " + BleTypes.GENERAL_SERVICE_UUID +
            ' and characteristic ' + BleTypes.CHAR_SELECT_CONFIGURATION_UUID);
        var paramsObj = { "address": address, "serviceUuid": BleTypes.GENERAL_SERVICE_UUID,
            "characteristicUuid": BleTypes.CHAR_SELECT_CONFIGURATION_UUID, "value": v };
        bluetoothle.write(function (obj) {
            if (obj.status == 'written') {
                var msg = 'Successfully written to "select configuration" characteristic - ' +
                    obj.status;
                console.log(msg);
                if (successCB)
                    successCB(msg);
            }
            else {
                var msg = 'Error in writing to "select configuration" characteristic - ' +
                    obj;
                console.log(msg);
                if (errorCB)
                    errorCB(msg);
            }
        }, function (obj) {
            var msg = 'Error in writing to "select configuration" characteristic - ' +
                obj.error + " - " + obj.message;
            console.log(msg);
            if (errorCB)
                errorCB(msg);
        }, paramsObj);
    };
    /** Send a message over the mesh network
     * message needs the following properties:
     * .channel: there are several channels to use
     * .target: bluetooth address (6 bytes) of target of this message. Use all zeroes for broadcast.
     * .type: what type of message this is
     * .length: length of payload
     * .payload: data to be sent
     */
    self.writeMeshMessage = function (address, message, successCB, errorCB) {
        message.length += 8; // Add length of target address and length of message type
        // build up a single byte array, prepending payload with type and payload length, preamble size is 4
        var u8 = new Uint8Array(message.length + 12);
        u8[0] = message.channel;
        u8[1] = BleTypes.RESERVED;
        u8[2] = (message.length & 0xFF); // endianness: least significant byte first
        u8[3] = (message.length >> 8 & 0xFF);
        if (message.target.length != 6) {
            console.log("invalid bluetooth address ", message.target);
            return;
        }
        u8.set(message.target, 4); // bluetooth address of target crownstone: 6 bytes
        u8[10] = (message.type & 0xFF); // endianness: least significant byte first
        u8[11] = (message.type >> 8 & 0xFF);
        u8.set(message.payload, 12);
        var v = bluetoothle.bytesToEncodedString(u8);
        console.log("Write " + v + " at service " + BleTypes.GENERAL_SERVICE_UUID +
            ' and characteristic ' + BleTypes.CHAR_MESH_UUID);
        var paramsObj = { "address": address, "serviceUuid": BleTypes.GENERAL_SERVICE_UUID,
            "characteristicUuid": BleTypes.CHAR_MESH_UUID, "value": v };
        bluetoothle.write(function (obj) {
            if (obj.status == 'written') {
                var msg = 'Successfully written to "mesh" characteristic - ' + obj.status;
                console.log(msg);
                if (successCB)
                    successCB(msg);
            }
            else {
                var msg = 'Error in writing to "mesh" characteristic - ' + obj;
                console.log(msg);
                if (errorCB)
                    errorCB(msg);
            }
        }, function (obj) {
            var msg = 'Error in writing to "mesh" characteristic - ' +
                obj.error + " - " + obj.message;
            console.log(msg);
            if (errorCB)
                errorCB(msg);
        }, paramsObj);
    };
    self.writeCurrentLimit = function (address, value) {
        var u8 = new Uint8Array(1);
        u8[0] = value & 0xFF;
        // u8[1] = (value >> 8) & 0xFF;
        var v = bluetoothle.bytesToEncodedString(u8);
        console.log("Write " + v + " at service " + BleTypes.POWER_SERVICE_UUID + ' and characteristic ' + BleTypes.CHAR_CURRENT_LIMIT_UUID);
        var paramsObj = { "address": address, "serviceUuid": BleTypes.POWER_SERVICE_UUID, "characteristicUuid": BleTypes.CHAR_CURRENT_LIMIT_UUID, "value": v };
        bluetoothle.write(function (obj) {
            if (obj.status == 'written') {
                console.log('Successfully written to current limit characteristic - ' + obj.status);
            }
            else {
                console.log('Writing to current limit characteristic was not successful' + obj);
            }
        }, function (obj) {
            console.log("Error in writing to current limit characteristic: " + obj.error + " - " + obj.message);
        }, paramsObj);
    };
    self.readCurrentLimit = function (address, callback) {
        console.log("Read current limit at service " + BleTypes.POWER_SERVICE_UUID + ' and characteristic ' + BleTypes.CHAR_CURRENT_LIMIT_UUID);
        var paramsObj = { "address": address, "serviceUuid": BleTypes.POWER_SERVICE_UUID, "characteristicUuid": BleTypes.CHAR_CURRENT_LIMIT_UUID };
        bluetoothle.read(function (obj) {
            if (obj.status == "read") {
                var currentLimit = bluetoothle.encodedStringToBytes(obj.value);
                console.log("current limit: " + currentLimit[0]);
                var value = currentLimit[0];
                callback(value);
            }
            else {
                console.log("Unexpected read status: " + obj.status);
                self.disconnectDevice(address);
            }
        }, function (obj) {
            console.log('Error in reading current limit characteristic: ' + obj.error + " - " + obj.message);
        }, paramsObj);
    };
    self.getTrackedDevices = function (address, callback) {
        console.log("Read device list at service " + BleTypes.INDOOR_LOCALIZATION_SERVICE_UUID + ' and characteristic ' + BleTypes.CHAR_LIST_TRACKED_DEVICES_UUID);
        var paramsObj = { "address": address, "serviceUuid": BleTypes.INDOOR_LOCALIZATION_SERVICE_UUID, "characteristicUuid": BleTypes.CHAR_LIST_TRACKED_DEVICES_UUID };
        bluetoothle.read(function (obj) {
            if (obj.status == "read") {
                var list = bluetoothle.encodedStringToBytes(obj.value);
                console.log("list: " + list[0]);
                callback(list);
            }
            else {
                console.log("Unexpected read status: " + obj.status);
                self.disconnectDevice(address);
            }
        }, function (obj) {
            console.log('Error in reading tracked devices: ' + obj.error + " - " + obj.message);
        }, paramsObj);
    };
    self.addTrackedDevice = function (address, bt_address, rssi) {
        var u8 = new Uint8Array(7);
        for (var i = 0; i < 6; i++) {
            u8[i] = parseInt(bt_address[i], 16);
            console.log("i: " + u8[i]);
        }
        u8[6] = rssi;
        var v = bluetoothle.bytesToEncodedString(u8);
        console.log("Write " + v + " at service " + BleTypes.INDOOR_LOCALIZATION_SERVICE_UUID + ' and characteristic ' + BleTypes.CHAR_ADD_TRACKED_DEVICE_UUID);
        var paramsObj = { "address": address, "serviceUuid": BleTypes.INDOOR_LOCALIZATION_SERVICE_UUID, "characteristicUuid": BleTypes.CHAR_ADD_TRACKED_DEVICE_UUID, "value": v };
        bluetoothle.write(function (obj) {
            if (obj.status == 'written') {
                console.log('Successfully written to add tracked device characteristic - ' + obj.status);
            }
            else {
                console.log('Writing to add tracked device characteristic was not successful' + obj);
            }
        }, function (obj) {
            console.log("Error in writing to add tracked device characteristic: " + obj.error + " - " + obj.message);
        }, paramsObj);
    };
};
// TODO: sort ascending / descending
// TODO: import instead of reference
/// <reference path="ble-base.ts"/>
/// <reference path="ble-utils.ts"/>
var BleState;
(function (BleState) {
    BleState[BleState["uninitialized"] = 0] = "uninitialized";
    BleState[BleState["initialized"] = 1] = "initialized";
    BleState[BleState["scanning"] = 2] = "scanning";
    BleState[BleState["connecting"] = 3] = "connecting";
    BleState[BleState["connected"] = 4] = "connected";
})(BleState || (BleState = {}));
var BleFilter;
(function (BleFilter) {
    BleFilter[BleFilter["all"] = 0] = "all";
    BleFilter[BleFilter["crownstone"] = 1] = "crownstone";
    BleFilter[BleFilter["doBeacon"] = 2] = "doBeacon";
    BleFilter[BleFilter["iBeacon"] = 3] = "iBeacon";
})(BleFilter || (BleFilter = {}));
var BleDevice = (function () {
    function BleDevice(obj) {
        this.address = "";
        this.name = "";
        this.rssi = -128;
        if (obj.hasOwnProperty("address") && obj.hasOwnProperty("name") && obj.hasOwnProperty("rssi")) {
            this.address = obj.address;
            this.name = obj.name;
            this.rssi = obj.rssi;
        }
    }
    return BleDevice;
})();
var BleDeviceList = (function () {
    function BleDeviceList() {
        this.devices = [];
    }
    BleDeviceList.prototype.getDevice = function (address) {
        var index;
        if (this.devices.some(function (el, ind) {
            if (el.address == address) {
                index = ind;
                return true;
            }
        })) {
            return this.devices[index];
        }
        return undefined;
    };
    //addDevice(obj: BleDevice) {
    //	if (!this.getDevice(obj.address)) {
    //		this.devices.push(obj);
    //	}
    //}
    BleDeviceList.prototype.clear = function () {
        this.devices = [];
    };
    // TODO: keep up average rssi
    BleDeviceList.prototype.updateDevice = function (device) {
        var dev = this.getDevice(device.address);
        if (dev) {
            dev = device;
        }
        else {
            //this.addDevice(obj);
            this.devices.push(device);
        }
    };
    // Sort by RSSI, descending.
    BleDeviceList.prototype.sort = function () {
        this.devices.sort(function (a, b) {
            return b.rssi - a.rssi;
        });
    };
    return BleDeviceList;
})();
var BleExt = (function () {
    function BleExt() {
        this.ble = new BleBase();
        this.devices = new BleDeviceList();
        this.characteristics = {};
        this.state = BleState.uninitialized;
        this.scanFilter = BleFilter.all;
    }
    // TODO: just inherit from base class
    BleExt.prototype.init = function (successCB, errorCB) {
        // if (this.state == BleState.initialized) {
        // 	if (successCB) successCB();
        // 	return;
        // }
        this.ble.init(function (enabled) {
            if (enabled) {
                this.state = BleState.initialized;
                if (successCB)
                    successCB();
            }
            else {
                this.state = BleState.uninitialized;
                if (errorCB)
                    errorCB();
            }
        }.bind(this));
    };
    /*
     * Filter scanned devices.
     */
    BleExt.prototype.setScanFilter = function (filter) {
        //if (!Array.isArray(filter)) {
        //	console.log("Must supply an array!");
        //	return;
        //}
        this.scanFilter = filter;
    };
    BleExt.prototype.startScan = function (scanCB, errorCB) {
        if (this.state !== BleState.initialized) {
            console.log("State must be \"initialized\"");
            return;
        }
        this.devices.clear();
        this.state = BleState.scanning;
        this.ble.startEndlessScan(function (obj) {
            // if (this.scanFilter.length > 0) {
            //var pass = false;
            //for (var i=0; i<this.scanFilter.length; i++) {
            //	if ((this.scanFilter[i] == BleFilter.crownstone && obj.isCrownstone) ||
            //		(this.scanFilter[i] == BleFilter.doBeacon && obj.isIBeacon) ||
            //		(this.scanFilter[i] == BleFilter.iBeacon && obj.isIBeacon)) {
            //		pass = true;
            //		break;
            //	}
            //}
            //if (!pass) {
            //	return;
            //}
            // }
            if ((this.scanFilter != BleFilter.all) &&
                ((this.scanFilter == BleFilter.crownstone && !obj.isCrownstone) ||
                    (this.scanFilter == BleFilter.doBeacon && !obj.isIBeacon) ||
                    (this.scanFilter == BleFilter.iBeacon && !obj.isIBeacon))) {
                return;
            }
            this.devices.updateDevice(new BleDevice(obj));
            this.devices.sort();
            if (scanCB)
                scanCB(obj);
        }.bind(this));
    };
    // TODO: just inherit from base class
    BleExt.prototype.stopScan = function (successCB, errorCB) {
        this.state = BleState.initialized;
        this.ble.stopEndlessScan();
        if (successCB)
            successCB();
    };
    BleExt.prototype.connect = function (address, successCB, errorCB) {
        console.log("Connect");
        var self = this;
        if (address) {
            this.setTarget(address);
        }
        this.state = BleState.connecting;
        this.ble.connectDevice(this.targetAddress, 5, function (success) {
            if (success) {
                self.onConnect();
                if (successCB)
                    successCB();
            }
            else {
                if (errorCB)
                    errorCB();
            }
        });
    };
    BleExt.prototype.disconnect = function (successCB, errorCB) {
        console.log("Disconnect");
        var self = this;
        this.ble.disconnectDevice(this.targetAddress, function () {
            self.onDisconnect();
            if (successCB)
                successCB();
        }, function () {
            console.log("Assuming we are disconnected anyway");
            if (errorCB)
                errorCB();
        });
    };
    BleExt.prototype.discoverServices = function (characteristicCB, successCB, errorCB) {
        this.ble.discoverServices(this.targetAddress, function (serviceUuid, characteristicUuid) {
            this.onCharacteristicDiscover(serviceUuid, characteristicUuid);
            if (characteristicCB)
                characteristicCB(serviceUuid, characteristicUuid);
        }.bind(this), successCB, errorCB);
    };
    // Called on successful connect
    BleExt.prototype.onConnect = function () {
        console.log("onConnect");
        this.state = BleState.connected;
        if (this.disconnectTimeout != null) {
            clearTimeout(this.disconnectTimeout);
        }
        if (this.onConnectCallback)
            this.onConnectCallback();
    };
    BleExt.prototype.onDisconnect = function () {
        console.log("onDisconnect");
        this.state = BleState.initialized;
        if (this.disconnectTimeout != null) {
            clearTimeout(this.disconnectTimeout);
        }
        //this.targetAddress = "";
        this.characteristics = {};
    };
    BleExt.prototype.onCharacteristicDiscover = function (serviceUuid, characteristicUuid) {
        console.log("Discovered characteristic: " + characteristicUuid);
        this.characteristics[characteristicUuid] = true;
    };
    BleExt.prototype.setConnectListener = function (func) {
        this.onConnectCallback = func;
    };
    BleExt.prototype.setTarget = function (address) {
        this.targetAddress = address;
    };
    BleExt.prototype.getDeviceList = function () { return this.devices; };
    BleExt.prototype.getState = function () { return this.state; };
    BleExt.prototype.connectAndDiscover = function (address, characteristicCB, successCB, errorCB) {
        var connectionSuccess = function () {
            this.ble.discoverServices(address, null, function (obj) {
                var services = obj.services;
                for (var i = 0; i < services.length; ++i) {
                    var serviceUuid = services[i].serviceUuid;
                    var characteristics = services[i].characteristics;
                    for (var j = 0; j < characteristics.length; ++j) {
                        var characteristicUuid = characteristics[j].characteristicUuid;
                        this.onCharacteristicDiscover(serviceUuid, characteristicUuid);
                        if (characteristicCB) {
                            characteristicCB(serviceUuid, characteristicUuid);
                        }
                    }
                }
                if (successCB)
                    successCB();
            }.bind(this), function (msg) {
                console.log(msg);
                this.disconnect();
                if (errorCB)
                    errorCB(msg);
            }.bind(this));
        };
        if (this.state == BleState.initialized) {
            //			var timeout = 10;
            this.connect(address, 
            //				timeout,
            connectionSuccess.bind(this), errorCB);
        }
        else if (this.state == BleState.connected && this.targetAddress == address) {
            connectionSuccess();
        }
        else {
            if (errorCB)
                errorCB("Not in correct state to connect and not connected to " + address);
        }
    };
    /* Connects, discovers characteristic, executes given function, then disconnects
     */
    BleExt.prototype.connectExecuteAndDisconnect = function (address, func, successCB, errorCB) {
        var self = this;
        // Function that has to be called when "func" is done.
        var callback = function () {
            // Delayed disconnect, such that if ConnectExecuteAndDisconnect is called again, we don't have to connect again.
            if (self.disconnectTimeout != null) {
                clearTimeout(self.disconnectTimeout);
            }
            self.disconnectTimeout = setTimeout(self.disconnect.bind(self), 1000);
        };
        // Function to be called when connected and characteristic has been discovered.
        var discoverSuccess = function () {
            func(
            // TODO: variable number of orguments: use "arguments.length" and successCB.apply(successCB, args)
            // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments
            // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
            function (arg) {
                callback();
                if (successCB)
                    successCB(arg);
            }, function (arg) {
                callback();
                if (errorCB)
                    errorCB(arg);
            });
        };
        // And here we go..
        this.connectAndDiscover(address, null, discoverSuccess, errorCB);
    };
    ///////////////////
    // Power service //
    ///////////////////
    // TODO: keep up PWM value and use it
    BleExt.prototype.togglePower = function (successCB, errorCB) {
        console.log("Toggle power");
        this.readPWM(function (value) {
            if (value > 0) {
                this.writePWM(0, successCB, errorCB);
            }
            else {
                this.writePWM(255, successCB, errorCB);
            }
        }.bind(this), errorCB);
    };
    BleExt.prototype.powerOn = function (successCB, errorCB) {
        this.writePWM(255, successCB, errorCB);
    };
    BleExt.prototype.powerOff = function (successCB, errorCB) {
        this.writePWM(0, successCB, errorCB);
    };
    BleExt.prototype.writePWM = function (pwm, successCB, errorCB) {
        if (!this.characteristics.hasOwnProperty(BleTypes.CHAR_PWM_UUID)) {
            if (errorCB)
                errorCB();
            return;
        }
        console.log("Set pwm to " + pwm);
        this.ble.writePWM(this.targetAddress, pwm, successCB, errorCB);
    };
    BleExt.prototype.connectAndWritePWM = function (address, pwm, successCB, errorCB) {
        function func(successCB, errorCB) {
            this.writePWM(pwm, successCB, errorCB);
        }
        this.connectExecuteAndDisconnect(address, func, successCB, errorCB);
    };
    BleExt.prototype.readPWM = function (successCB, errorCB) {
        if (!this.characteristics.hasOwnProperty(BleTypes.CHAR_PWM_UUID)) {
            if (errorCB)
                errorCB();
            return;
        }
        console.log("Reading current PWM value");
        this.ble.readPWM(this.targetAddress, successCB); //TODO: should have an errorCB
    };
    BleExt.prototype.connectAndReadPWM = function (address, successCB, errorCB) {
        function func(successCB, errorCB) {
            this.readPWM(successCB, errorCB);
        }
        this.connectExecuteAndDisconnect(address, func, successCB, errorCB);
    };
    BleExt.prototype.connectAndTogglePower = function (address, successCB, errorCB) {
        this.connectAndReadPWM(address, function (value) {
            if (value > 0) {
                this.connectAndWritePWM(address, 0, successCB, errorCB);
            }
            else {
                this.connectAndWritePWM(address, 255, successCB, errorCB);
            }
        }, errorCB);
    };
    BleExt.prototype.readCurrentConsumption = function (successCB, errorCB) {
        if (!this.characteristics.hasOwnProperty(BleTypes.CHAR_SAMPLE_CURRENT_UUID) ||
            !this.characteristics.hasOwnProperty(BleTypes.CHAR_CURRENT_CONSUMPTION_UUID)) {
            if (errorCB)
                errorCB();
            return;
        }
        var self = this;
        this.ble.sampleCurrent(this.targetAddress, 0x01, function () {
            setTimeout(function () {
                self.ble.readCurrentConsumption(self.targetAddress, successCB); //TODO: should have an errorCB
            }, 100);
        }); // TODO: should have an errorCB
    };
    BleExt.prototype.readCurrentCurve = function (successCB, errorCB) {
        if (!this.characteristics.hasOwnProperty(BleTypes.CHAR_SAMPLE_CURRENT_UUID) ||
            !this.characteristics.hasOwnProperty(BleTypes.CHAR_CURRENT_CURVE_UUID)) {
            if (errorCB)
                errorCB();
            return;
        }
        var self = this;
        this.ble.sampleCurrent(this.targetAddress, 0x02, function () {
            setTimeout(function () {
                self.ble.getCurrentCurve(self.targetAddress, successCB); //TODO: should have an errorCB
            }, 100);
        }); // TODO: should have an errorCB
    };
    BleExt.prototype.writeCurrentLimit = function (value, successCB, errorCB) {
        if (!this.characteristics.hasOwnProperty(BleTypes.CHAR_CURRENT_LIMIT_UUID)) {
            if (errorCB)
                errorCB();
            return;
        }
        console.log("TODO");
        //this.ble.writeCurrentLimit(this.targetAddress, value)
    };
    BleExt.prototype.readCurrentLimit = function (successCB, errorCB) {
        if (!this.characteristics.hasOwnProperty(BleTypes.CHAR_CURRENT_LIMIT_UUID)) {
            if (errorCB)
                errorCB();
            return;
        }
        console.log("TODO");
        this.ble.readCurrentLimit(this.targetAddress, successCB); //TODO: should have an errorCB
    };
    /////////////////////
    // General service //
    /////////////////////
    BleExt.prototype.readTemperature = function (successCB, errorCB) {
        if (!this.characteristics.hasOwnProperty(BleTypes.CHAR_TEMPERATURE_UUID)) {
            if (errorCB)
                errorCB();
            return;
        }
        this.ble.readTemperature(this.targetAddress, successCB); //TODO: should have an errorCB
    };
    BleExt.prototype.writeMeshMessage = function (obj, successCB, errorCB) {
        if (!this.characteristics.hasOwnProperty(BleTypes.CHAR_MESH_UUID)) {
            if (errorCB)
                errorCB();
            return;
        }
        console.log("Send mesh message: ", obj);
        this.ble.writeMeshMessage(this.targetAddress, obj, successCB, errorCB);
    };
    BleExt.prototype.hasConfigurationCharacteristics = function () {
        return this.characteristics.hasOwnProperty(BleTypes.CHAR_SELECT_CONFIGURATION_UUID) &&
            this.characteristics.hasOwnProperty(BleTypes.CHAR_GET_CONFIGURATION_UUID) &&
            this.characteristics.hasOwnProperty(BleTypes.CHAR_SET_CONFIGURATION_UUID);
    };
    BleExt.prototype.writeConfiguration = function (obj, successCB, errorCB) {
        if (!this.characteristics.hasOwnProperty(BleTypes.CHAR_SET_CONFIGURATION_UUID)) {
            return;
        }
        console.log("Set config");
        this.ble.writeConfiguration(this.targetAddress, obj, successCB, errorCB);
    };
    BleExt.prototype.connectAndWriteConfiguration = function (address, config, successCB, errorCB) {
        function func(successCB, errorCB) {
            this.writeConfiguration(config, successCB, errorCB);
        }
        this.connectExecuteAndDisconnect(address, func, successCB, errorCB);
    };
    BleExt.prototype.readConfiguration = function (configurationType, successCB, errorCB) {
        if (!this.characteristics.hasOwnProperty(BleTypes.CHAR_SELECT_CONFIGURATION_UUID) ||
            !this.characteristics.hasOwnProperty(BleTypes.CHAR_GET_CONFIGURATION_UUID)) {
            console.log("Missing characteristic UUID");
            if (errorCB)
                errorCB();
            return;
        }
        this.ble.getConfiguration(this.targetAddress, configurationType, successCB, errorCB);
    };
    // TODO? writing/reading configs, should be replaced with a functions to convert value object to a config object and then call writeConfiguration
    BleExt.prototype.readDeviceName = function (successCB, errorCB) {
        if (!this.hasConfigurationCharacteristics()) {
            if (errorCB)
                errorCB();
            return;
        }
        this.ble.getDeviceName(this.targetAddress, successCB, errorCB);
    };
    BleExt.prototype.writeDeviceName = function (value, successCB, errorCB) {
        if (!this.hasConfigurationCharacteristics()) {
            if (errorCB)
                errorCB();
            return;
        }
        this.ble.setDeviceName(this.targetAddress, value, successCB, errorCB);
    };
    BleExt.prototype.readBeaconMajor = function (successCB, errorCB) {
        if (!this.hasConfigurationCharacteristics()) {
            if (errorCB)
                errorCB();
            return;
        }
        this.ble.getBeaconMajor(this.targetAddress, successCB, errorCB);
    };
    BleExt.prototype.writeBeaconMajor = function (value, successCB, errorCB) {
        if (!this.hasConfigurationCharacteristics()) {
            if (errorCB)
                errorCB();
            return;
        }
        this.ble.setBeaconMajor(this.targetAddress, value, successCB, errorCB);
    };
    BleExt.prototype.readBeaconMinor = function (successCB, errorCB) {
        if (!this.hasConfigurationCharacteristics()) {
            if (errorCB)
                errorCB();
            return;
        }
        this.ble.getBeaconMinor(this.targetAddress, successCB, errorCB);
    };
    BleExt.prototype.writeBeaconMinor = function (value, successCB, errorCB) {
        if (!this.hasConfigurationCharacteristics()) {
            if (errorCB)
                errorCB();
            return;
        }
        this.ble.setBeaconMinor(this.targetAddress, value, successCB, errorCB);
    };
    BleExt.prototype.readBeaconProximityUuid = function (successCB, errorCB) {
        if (!this.hasConfigurationCharacteristics()) {
            if (errorCB)
                errorCB();
            return;
        }
        this.ble.getBeaconProximityUuid(this.targetAddress, successCB, errorCB);
    };
    BleExt.prototype.writeBeaconProximityUuid = function (value, successCB, errorCB) {
        if (!this.hasConfigurationCharacteristics()) {
            if (errorCB)
                errorCB();
            return;
        }
        this.ble.setBeaconProximityUuid(this.targetAddress, value, successCB, errorCB);
    };
    BleExt.prototype.readBeaconCalibratedRssi = function (successCB, errorCB) {
        if (!this.hasConfigurationCharacteristics()) {
            if (errorCB)
                errorCB();
            return;
        }
        this.ble.getBeaconCalibratedRssi(this.targetAddress, successCB, errorCB);
    };
    BleExt.prototype.writeBeaconCalibratedRssi = function (value, successCB, errorCB) {
        if (!this.hasConfigurationCharacteristics()) {
            if (errorCB)
                errorCB();
            return;
        }
        this.ble.setBeaconCalibratedRssi(this.targetAddress, value, successCB, errorCB);
    };
    BleExt.prototype.readDeviceType = function (successCB, errorCB) {
        if (!this.hasConfigurationCharacteristics()) {
            if (errorCB)
                errorCB();
            return;
        }
        this.ble.getDeviceType(this.targetAddress, successCB, errorCB);
    };
    BleExt.prototype.writeDeviceType = function (value, successCB, errorCB) {
        if (!this.hasConfigurationCharacteristics()) {
            if (errorCB)
                errorCB();
            return;
        }
        this.ble.setDeviceType(this.targetAddress, value, successCB, errorCB);
    };
    BleExt.prototype.readFloor = function (successCB, errorCB) {
        if (!this.hasConfigurationCharacteristics()) {
            if (errorCB)
                errorCB();
            return;
        }
        this.ble.getFloor(this.targetAddress, successCB, errorCB);
    };
    BleExt.prototype.writeFloor = function (value, successCB, errorCB) {
        if (!this.hasConfigurationCharacteristics()) {
            if (errorCB)
                errorCB();
            return;
        }
        this.ble.setFloor(this.targetAddress, value, successCB, errorCB);
    };
    BleExt.prototype.readRoom = function (successCB, errorCB) {
        if (!this.hasConfigurationCharacteristics()) {
            if (errorCB)
                errorCB();
            return;
        }
        this.ble.getRoom(this.targetAddress, successCB, errorCB);
    };
    BleExt.prototype.writeRoom = function (value, successCB, errorCB) {
        if (!this.hasConfigurationCharacteristics()) {
            if (errorCB)
                errorCB();
            return;
        }
        this.ble.setRoom(this.targetAddress, value, successCB, errorCB);
    };
    BleExt.prototype.readTxPower = function (successCB, errorCB) {
        if (!this.hasConfigurationCharacteristics()) {
            if (errorCB)
                errorCB();
            return;
        }
        this.ble.getTxPower(this.targetAddress, successCB, errorCB);
    };
    BleExt.prototype.writeTxPower = function (value, successCB, errorCB) {
        if (!this.hasConfigurationCharacteristics()) {
            if (errorCB)
                errorCB();
            return;
        }
        this.ble.setTxPower(this.targetAddress, value, successCB, errorCB);
    };
    BleExt.prototype.readAdvertisementInterval = function (successCB, errorCB) {
        if (!this.hasConfigurationCharacteristics()) {
            if (errorCB)
                errorCB();
            return;
        }
        this.ble.getAdvertisementInterval(this.targetAddress, successCB, errorCB);
    };
    BleExt.prototype.writeAdvertisementInterval = function (value, successCB, errorCB) {
        if (!this.hasConfigurationCharacteristics()) {
            if (errorCB)
                errorCB();
            return;
        }
        this.ble.setAdvertisementInterval(this.targetAddress, value, successCB, errorCB);
    };
    // TODO: value should be an object with ssid and pw
    BleExt.prototype.writeWifi = function (value, successCB, errorCB) {
        if (!this.characteristics.hasOwnProperty(BleTypes.CHAR_SET_CONFIGURATION_UUID)) {
            if (errorCB)
                errorCB();
            return;
        }
        console.log("Set wifi to " + value);
        this.ble.setWifi(this.targetAddress, value, successCB, errorCB);
    };
    // TODO: value should be an object with ssid and pw
    BleExt.prototype.connectAndWriteWifi = function (address, value, successCB, errorCB) {
        //function func(successCB, errorCB) {
        //	this.writeWifi(value, successCB, errorCB);
        //}
        //this.connectExecuteAndDisconnect(address, GENERAL_SERVICE_UUID, CHAR_SET_CONFIGURATION_UUID, func.bind(this), successCB, errorCB);
        var self = this;
        function func(successCB, errorCB) {
            self.writeWifi(value, successCB, errorCB);
        }
        this.connectExecuteAndDisconnect(address, func, successCB, errorCB);
    };
    BleExt.prototype.readIp = function (successCB, errorCB) {
        this.readConfiguration(BleTypes.CONFIG_TYPE_WIFI, successCB, errorCB);
    };
    // TODO: should we also discover CHAR_SELECT_CONFIGURATION_UUID ? Seems like we're just lucky now.
    BleExt.prototype.connectAndReadIp = function (address, successCB, errorCB) {
        var self = this;
        function func(successCB, errorCB) {
            self.readIp(successCB, errorCB);
        }
        this.connectExecuteAndDisconnect(address, func, successCB, errorCB);
    };
    //////////////////////////
    // Localization service //
    //////////////////////////
    BleExt.prototype.readTrackedDevices = function (successCB, errorCB) {
        if (!this.characteristics.hasOwnProperty(BleTypes.CHAR_DEVICE_LIST_UUID)) {
            if (errorCB)
                errorCB();
            return;
        }
        this.ble.listDevices(this.targetAddress, successCB); //TODO: should have an errorCB
    };
    BleExt.prototype.writeTrackedDevice = function (deviceAddress, rssiThreshold, successCB, errorCB) {
        if (!this.characteristics.hasOwnProperty(BleTypes.CHAR_ADD_TRACKED_DEVICE_UUID)) {
            if (errorCB)
                errorCB();
            return;
        }
        console.log("TODO");
    };
    BleExt.prototype.readScannedDevices = function (successCB, errorCB) {
        if (!this.characteristics.hasOwnProperty(BleTypes.CHAR_DEVICE_LIST_UUID)) {
            if (errorCB)
                errorCB();
            return;
        }
        this.ble.listDevices(this.targetAddress, successCB); //TODO: should have an errorCB
    };
    BleExt.prototype.writeScanDevices = function (scan, successCB, errorCB) {
        if (!this.characteristics.hasOwnProperty(BleTypes.CHAR_DEVICE_SCAN_UUID)) {
            if (errorCB)
                errorCB();
            return;
        }
        this.ble.scanDevices(this.targetAddress, scan); //TODO: needs callbacks
        if (successCB)
            setTimeout(successCB(), 1000);
    };
    /* Makes the crownstone scan for other devices and report the result
     */
    BleExt.prototype.scanForDevices = function (successCB, errorCB) {
        // Enable scanning
        this.writeScanDevices(true, function () {
            setTimeout(stopScanAndReadResult.bind(this), 10000);
        }, errorCB);
        // Stop scanning and read result
        var stopScanAndReadResult = function () {
            this.writeScanDevices(false, this.readScannedDevices(successCB, errorCB), errorCB);
        };
    };
    return BleExt;
})();
/// <reference path="ble-ext.ts"/>
// Proper export
// var bluenet = new Bluenet();
var bluenet = {};
bluenet.BleBase = BleBase;
bluenet.BleState = BleState;
bluenet.BleDevice = BleDevice;
bluenet.BleExt = BleExt;
bluenet.BleUtils = BleUtils;
bluenet.BleFilter = BleFilter;
bluenet.BleTypes = BleTypes;
module.exports = bluenet;
// Dirty hack to avoid class functions not being able to find other classes
if (window) {
    console.log("export to window");
    window.BleBase = BleBase;
    window.BleState = BleState;
    window.BleDevice = BleDevice;
    window.BleExt = BleExt;
    window.BleUtils = BleUtils;
    window.BleFilter = BleFilter;
    window.BleTypes = BleTypes;
}
