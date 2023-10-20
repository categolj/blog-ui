import Head from "next/head";

import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #282c34;
  color: white;
  padding: 40px;
  border-radius: 10px;
  width: 600px;
  box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.2);
`;

const Input = styled.input`
  background-color: #333740;
  border: none;
  padding: 10px 15px;
  color: white;
  border-radius: 5px;
  width: 100%;
  margin-top: 10px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 20px;
`;

const RangeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default function Subnet() {
    const [ipAddress, setIpAddress] = useState('192.168.11.1');
    const [networkBits, setNetworkBits] = useState(24);
    const [subnetInfo, setSubnetInfo] = useState({});

    useEffect(() => {
        setSubnetInfo(calculateSubnet(ipAddress, networkBits));
    }, [ipAddress, networkBits]);

    return (<div>
        <Head>
            <title>Subnet Calculator - IK.AM</title>
        </Head>
        <h2>Subnet Calculator</h2>
        <Container>
            <Label>
                IP Address:
                <Input
                    type="text"
                    value={ipAddress}
                    onChange={(e) => setIpAddress(e.target.value)}
                />
            </Label>
            <Label>
                Network Bits:
                <RangeWrapper>
                    <input
                        type="range"
                        min="0"
                        max="31"
                        value={networkBits}
                        onChange={(e) => setNetworkBits(Number(e.target.value))}
                    />
                    <span>{networkBits}</span>
                </RangeWrapper>
            </Label>
            <div>
                Subnet Mask: {subnetInfo.subnetMask}
            </div>
            <div>
                Hosts per Net: {subnetInfo.hostsPerNet}
            </div>
            <div>
                Network Address: {subnetInfo.networkAddress}
            </div>
            <div>
                Broadcast Address: {subnetInfo.broadcastAddress}
            </div>
        </Container>
    </div>);
}


function calculateSubnet(ipAddress, networkBits) {
    const ipParts = ipAddress.split('.').map(Number);
    const subnetMask = (1 << 31) >> (networkBits - 1);
    const networkAddress = [ipParts[0] & (subnetMask >>> 24), ipParts[1] & ((subnetMask >>> 16) & 255), ipParts[2] & ((subnetMask >>> 8) & 255), ipParts[3] & (subnetMask & 255),];

    const hostMask = ~subnetMask;
    const broadcastAddress = [networkAddress[0] | ((hostMask >>> 24) & 255), networkAddress[1] | ((hostMask >>> 16) & 255), networkAddress[2] | ((hostMask >>> 8) & 255), networkAddress[3] | (hostMask & 255),];

    const hostsPerNet = Math.pow(2, 32 - networkBits) - 2;

    return {
        subnetMask: [(subnetMask >>> 24) & 255, (subnetMask >>> 16) & 255, (subnetMask >>> 8) & 255, subnetMask & 255,].join('.'),
        networkAddress: networkAddress.join('.'),
        broadcastAddress: broadcastAddress.join('.'),
        hostsPerNet,
    };
}

