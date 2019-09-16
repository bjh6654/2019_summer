#!/bin/bash
tsc baseball

zip baseball.zip /home/park/baseball/*

USER=park
IP=192.168.6.132
PW=cse
FILE='baseball.zip'
SAVE='/home/park/web'

expect << EOF
	set timeout 3
	spawn scp -o StrictHostKeyChecking=no $FILE $USER@$IP:$SAVE
	expect "password:"
	send "$PW\r"
	expect eof
EOF
