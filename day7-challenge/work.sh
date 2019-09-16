
#!/bin/bash

zipDir='backup_'$(date +%Y%m%d)
mkdir ${zipDir}

function getExt() {
	echo ${1#*.}
}

function search() {
	local count=0
	for directory in `ls $1`; do
		if [ -d $directory ]; then
			search $1$directory/
		elif [ $(getExt $directory) == "sh" ]; then
			echo $directory
			count=`expr $count + 1`
			echo $1${directory}
			cp $1${directory} ${zipDir}/${directory}
		fi
	done
	if [ $count -eq 0 ]; then
		echo $(basename $1) is empty
	fi
}

curloc=$(dirname $(realpath $0))
search

zip ${zipDir}'.zip' ${zipDir}/*

USER=park
IP=192.168.6.132
PW=cse
FILE=${zipDir}'.zip'
SAVE='/backup'

expect << EOF
	set timeout 8
	spawn scp -o StrictHostKeyChecking=no $FILE $USER@$IP:$SAVE
	expect "assword:"
	send "${PW}\r"
	expect eof
EOF

rm -r ${zipDir} ${zipDir}'.zip'
