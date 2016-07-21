#!/bin/bash

# This script checks if the symlink exists and is pointing to right place.
# Otherwise it'll fix it and restart Apache

CONFIG_FILE="$REMOTE_PATH/config/apache2/quiddicompare.co.uk.conf"
CONFIG_LINK="/etc/apache2/sites-enabled/100-quiddicompare"

CURRENT_FILE=$(readlink -f $CONFIG_LINK)

if [ "$CURRENT_FILE" != "$CONFIG_FILE" ]; then
    rm $CONFIG_LINK
    ln -s $CONFIG_FILE $CONFIG_LINK
fi

# restart apache to read new config
service apache2 restart
