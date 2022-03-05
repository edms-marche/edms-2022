### Recreate VMs from backup

reverse-proxy:
qmrestore /mnt/pve/ds1621-proxmox-nfs/dump/vzdump-qemu-108-2022_01_20-02_58_26.vma.zst 121 --storage local

pfsense:
qmrestore /mnt/pve/ds1621-proxmox-nfs/dump/vzdump-qemu-101-2022_01_17-06_08_57.vma.zst 122 --storage local

iis:
qmrestore /mnt/pve/ds1621-proxmox-nfs/dump/vzdump-qemu-117-2022_03_01-05_24_37.vma.zst 119 --storage local

sql:
qmrestore /mnt/pve/ds1621-proxmox-nfs/dump/vzdump-qemu-105-2022_01_18-07_22_24.vma.zst 120 --storage local
