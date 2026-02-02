#!/bin/bash
# Backup the PostgreSQL database
docker exec db pg_dumpall -U admin > ./backups/db_backup_$(date +%Y%m%d).sql
# Backup Redis data (if persistence is enabled)
docker exec redis redis-cli save