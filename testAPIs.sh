#!/bin/bash
#
# Copyright IBM Corp. All Rights Reserved.
#
# SPDX-License-Identifier: Apache-2.0
#

jq --version > /dev/null 2>&1
if [ $? -ne 0 ]; then
	echo "Please Install 'jq' https://stedolan.github.io/jq/ to execute this script"
	echo
	exit 1
fi
starttime=$(date +%s)

echo "POST request Enroll on Org1  ..."
echo
ORG1_TOKEN=$(curl -s -X POST \
  http://localhost:4000/users \
  -H "content-type: application/x-www-form-urlencoded" \
  -d 'username=Jim&orgName=org1')
echo $ORG1_TOKEN
ORG1_TOKEN=$(echo $ORG1_TOKEN | jq ".token" | sed "s/\"//g")
echo
echo "ORG1 token is $ORG1_TOKEN"
echo
echo "POST request Enroll on Org2 ..."
echo
ORG2_TOKEN=$(curl -s -X POST \
  http://localhost:4000/users \
  -H "content-type: application/x-www-form-urlencoded" \
  -d 'username=Barry&orgName=org2')
echo $ORG2_TOKEN
ORG2_TOKEN=$(echo $ORG2_TOKEN | jq ".token" | sed "s/\"//g")
echo
echo "ORG2 token is $ORG2_TOKEN"
echo
echo

echo "POST request Create channel  ..."
echo
curl -s -X POST \
  http://localhost:4000/channels \
  -H "authorization: Bearer $ORG1_TOKEN" \
  -H "content-type: application/json" \
  -d '{
	"channelName":"mychannel",
	"channelConfigPath":"../artifacts/channel/mychannel.tx"
}'
echo
echo
sleep 5
echo "POST request Join channel on Org1"
echo
curl -s -X POST \
  http://localhost:4000/channels/mychannel/peers \
  -H "authorization: Bearer $ORG1_TOKEN" \
  -H "content-type: application/json" \
  -d '{
	"peers": ["peer1","peer2"]
}'
echo
echo

echo "POST request Join channel on Org2"
echo
curl -s -X POST \
  http://localhost:4000/channels/mychannel/peers \
  -H "authorization: Bearer $ORG2_TOKEN" \
  -H "content-type: application/json" \
  -d '{
	"peers": ["peer1","peer2"]
}'
echo
echo

echo "POST Install chaincode on Org1"
echo
curl -s -X POST \
  http://localhost:4000/chaincodes \
  -H "authorization: Bearer $ORG1_TOKEN" \
  -H "content-type: application/json" \
  -d '{
	"peers": ["peer1", "peer2"],
	"chaincodeName":"mycc",
	"chaincodePath":"github.com/example_cc",
	"chaincodeVersion":"v2"
}'
echo
echo
echo "POST Install chaincode2 on Org1"
echo
curl -s -X POST \
  http://localhost:4000/chaincodes \
  -H "authorization: Bearer $ORG1_TOKEN" \
  -H "content-type: application/json" \
  -d '{
  "peers": ["peer1", "peer2"],
  "chaincodeName":"mycc1",
  "chaincodePath":"github.com/example_cc",
  "chaincodeVersion":"v1"
}'
echo
echo


echo "POST Install chaincode on Org2"
echo
curl -s -X POST \
  http://localhost:4000/chaincodes \
  -H "authorization: Bearer $ORG2_TOKEN" \
  -H "content-type: application/json" \
  -d '{
	"peers": ["peer1","peer2"],
	"chaincodeName":"mycc",
	"chaincodePath":"github.com/example_cc",
	"chaincodeVersion":"v2"
}'
echo
echo

echo "POST instantiate chaincode on peer1 of Org1"
echo
curl -s -X POST \
  http://localhost:4000/channels/mychannel/chaincodes \
  -H "authorization: Bearer $ORG1_TOKEN" \
  -H "content-type: application/json" \
  -d '{
	"chaincodeName":"mycc",
	"chaincodeVersion":"v2",
	"args":[]
}'
echo
echo
echo "POST instantiate chaincode2 on peer1 of Org1"
echo
curl -s -X POST \
  http://localhost:4000/channels/mychannel/chaincodes \
  -H "authorization: Bearer $ORG1_TOKEN" \
  -H "content-type: application/json" \
  -d '{
  "chaincodeName":"mycc1",
  "chaincodeVersion":"v1",
  "args":[]
}'
echo
echo

echo "POST invoke chaincode on peers of Org1 and Org2"
echo
TRX_ID=$(curl -s -X POST \
  http://localhost:4000/channels/mychannel/chaincodes/mycc \
 -H "authorization: Bearer $ORG1_TOKEN" \
 -H "content-type: application/json" \
   -d '{
	"fcn":"auctionregistry",
	"args":["a1","omkar","tv","100","2","2016-Feb-03","2016-Mar-03"]
}')
echo "Transacton ID is $TRX_ID"
echo

echo "POST invoke chaincode on peers of Org1 and Org2"
echo
TRX_ID=$(curl -s -X POST \
  http://localhost:4000/channels/mychannel/chaincodes/mycc \
 -H "authorization: Bearer $ORG1_TOKEN" \
 -H "content-type: application/json" \
   -d '{
  "fcn":"auctionregistry",
  "args":["a2","sandeep","radio","100","2","2016-Feb-03","2016-Mar-03"]
}')
echo "Transacton ID is $TRX_ID"
echo



echo "POST invoke chaincode on peers of Org1 and Org2"
echo
TRX_ID=$(curl -s -X POST \
  http://localhost:4000/channels/mychannel/chaincodes/mycc \
  -H "authorization: Bearer $ORG1_TOKEN" \
  -H "content-type: application/json" \
  -d '{
  "fcn":"bidregistry",
  "args":["a2","sai","150","2016-Feb-24"]
}')
echo "Transacton ID is $TRX_ID"
echo

echo "POST invoke chaincode on peers of Org1 and Org2"
echo
TRX_ID=$(curl -s -X POST \
  http://localhost:4000/channels/mychannel/chaincodes/mycc \
  -H "authorization: Bearer $ORG1_TOKEN" \
  -H "content-type: application/json" \
  -d '{
  "fcn":"bidregistry",
  "args":["a2","jash","150","2016-Feb-24"]
}')
echo "Transacton ID is $TRX_ID"
echo

echo "POST invoke chaincode on peers of Org1 and Org2"
echo
TRX_ID=$(curl -s -X POST \
  http://localhost:4000/channels/mychannel/chaincodes/mycc \
  -H "authorization: Bearer $ORG1_TOKEN" \
  -H "content-type: application/json" \
  -d '{
  "fcn":"bidregistry",
  "args":["a1","sai","150","2016-Feb-24"]
}')
echo "Transacton ID is $TRX_ID"
echo

echo "POST invoke chaincode on peers of Org1 and Org2"
echo
TRX_ID=$(curl -s -X POST \
  http://localhost:4000/channels/mychannel/chaincodes/mycc \
  -H "authorization: Bearer $ORG1_TOKEN" \
  -H "content-type: application/json" \
  -d '{
  "fcn":"bidregistry",
  "args":["a1","sree","150","2016-Feb-24"]
}')
echo "Transacton ID is $TRX_ID"
echo


echo "POST invoke chaincode on peers of Org1 and Org2"
echo
TRX_ID=$(curl -s -X POST \
  http://localhost:4000/channels/mychannel/chaincodes/mycc \
  -H "authorization: Bearer $ORG1_TOKEN" \
  -H "content-type: application/json" \
  -d '{
  "fcn":"bidregistry",
  "args":["a1","jash","150","2016-Feb-24"]
}')
echo "Transacton ID is $TRX_ID"
echo


echo "POST invoke chaincode on peers of Org1 and Org2"
echo
TRX_ID=$(curl -s -X POST \
  http://localhost:4000/channels/mychannel/chaincodes/mycc \
  -H "authorization: Bearer $ORG1_TOKEN" \
  -H "content-type: application/json" \
  -d '{
  "fcn":"comparebid",
  "args":["a1"]
}')
echo "Transacton ID is $TRX_ID"
echo



echo "GET query chaincode on peer1 of Org1"
echo
curl -s -X GET \
 "http://localhost:4000/channels/mychannel/chaincodes/mycc?peer=peer1&fcn=auctionlist&args=['a0','a99999999999999999']" \
 -H "authorization: Bearer $ORG1_TOKEN" \
 -H "content-type: application/json"
echo
echo

  

echo "GET query chaincode on peer1 of Org1"
echo
curl -s -X GET \
 "http://localhost:4000/channels/mychannel/chaincodes/mycc?peer=peer1&fcn=auctionbyId&args=['a1']" \
 -H "authorization: Bearer $ORG1_TOKEN" \
 -H "content-type: application/json"
echo
echo


<<"COMMENT" echo "POST invoke chaincode on peers of Org1 and Org2"
echo
TRX_ID=$(curl -s -X POST \
  http://localhost:4000/channels/mychannel/chaincodes/mycc \
  -H "authorization: Bearer $ORG1_TOKEN" \
  -H "content-type: application/json" \
  -d '{
  "fcn":"auctionbyId",
  "args":["a1"]
}')
echo "Transacton ID is $TRX_ID"
echo
COMMENT
