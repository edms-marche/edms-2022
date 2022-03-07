### How to show connected targets

iscsiadm -m session

```text
root@pve-230:~# iscsiadm -m session
tcp: [1] 10.0.1.210:3260,1 iqn.2000-01.com.synology:DS1621-210.Target-Proxmox.0258a2daacd (non-flash)
```

iscsiadm -m session --rescan

```text
root@pve-230:~# iscsiadm -m session --rescan
Rescanning session [sid: 1, target: iqn.2000-01.com.synology:DS1621-210.Target-Proxmox.0258a2daacd, portal: 10.0.1.210,3260]
```

iscsiadm -m session -P 3

```text
root@pve-230:~# iscsiadm -m session -P 3
iSCSI Transport Class version 2.0-870
version 2.1.3
Target: iqn.2000-01.com.synology:DS1621-210.Target-Proxmox.0258a2daacd (non-flash)
        Current Portal: 10.0.1.210:3260,1
        Persistent Portal: 10.0.1.210:3260,1
                **********
                Interface:
                **********
                Iface Name: default
                Iface Transport: tcp
                Iface Initiatorname: iqn.1993-08.org.debian:01:17b0eba34328
                Iface IPaddress: 10.0.1.230
                Iface HWaddress: default
                Iface Netdev: default
                SID: 1
                iSCSI Connection State: LOGGED IN
                iSCSI Session State: LOGGED_IN
                Internal iscsid Session State: NO CHANGE
                *********
                Timeouts:
                *********
                Recovery Timeout: 120
                Target Reset Timeout: 30
                LUN Reset Timeout: 30
                Abort Timeout: 15
                *****
                CHAP:
                *****
                username: marche
                password: ********
                username_in: <empty>
                password_in: ********
                ************************
                Negotiated iSCSI params:
                ************************
                HeaderDigest: None
                DataDigest: None
                MaxRecvDataSegmentLength: 262144
                MaxXmitDataSegmentLength: 262144
                FirstBurstLength: 65536
                MaxBurstLength: 262144
                ImmediateData: Yes
                InitialR2T: Yes
                MaxOutstandingR2T: 1
                ************************
                Attached SCSI devices:
                ************************
                Host Number: 6  State: running
                scsi6 Channel 00 Id 0 Lun: 1
                        Attached scsi disk sdd          State: running
```

### Show node's iSCSI id

cat /etc/iscsi/initiatorname.iscsi

```text
root@pve-229:~# cat /etc/iscsi/initiatorname.iscsi
## DO NOT EDIT OR REMOVE THIS FILE!
## If you remove this file, the iSCSI daemon will not start.
## If you change the InitiatorName, existing access control lists
## may reject this initiator.  The InitiatorName must be unique
## for each iSCSI initiator.  Do NOT duplicate iSCSI InitiatorNames.
InitiatorName=iqn.1993-08.org.debian:01:67d41e5af543
```

