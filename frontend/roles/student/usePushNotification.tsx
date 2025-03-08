import { useState,useEffect,useRef } from "react";

import  * as Device from 'expo-device';
import * as Notification from 'expo-notifications';
import Constants from 'expo-constants';

import { Platform } from "react-native";

export interface PushNotificationState{
    notification?:Notification.Notification;
    expoPushToken?:Notification.ExpoPushToken;
}

export const usePushNotifications = {}: PushNotificationState => {
        Notification.setNotificationHandler({
            handleNotification: async ()=>({
                shouldPlaySound: false,
                shouldShowAlert: true,
                shouldSetBadge:false,
            }),
        });

}
