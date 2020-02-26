import React from 'react';
import {
    CardWithTitle,
    CardTitle,
    SubTitle,
    Card,
    Separation,
    Sub4Title,
    ResponsiveLine,
    DarkSubTitle,
} from '../../components/generic/Styled';
import { DownloadBackups } from './DownloadBackups';
import { VerifyBackups } from './VerifyBackups';
import { RecoverFunds } from './RecoverFunds';
import { AdminSwitch } from '../../components/adminSwitch/AdminSwitch';
import styled from 'styled-components';
import { getDateDif, getFormatDate } from 'components/generic/Helpers';

export const NoWrap = styled.div`
    margin-right: 16px;
    white-space: nowrap;
`;

export const BackupsView = () => {
    const lastDate = localStorage.getItem('lastBackup');

    const getDate = () => {
        if (lastDate) {
            return `${getDateDif(lastDate)} ago (${getFormatDate(lastDate)})`;
        }
        return 'Has not been backed up!';
    };

    return (
        <CardWithTitle>
            <CardTitle>
                <SubTitle>General Backup</SubTitle>
            </CardTitle>
            <Card>
                <ResponsiveLine>
                    <DarkSubTitle>Last Backup Date:</DarkSubTitle>
                    <Sub4Title>{getDate()}</Sub4Title>
                </ResponsiveLine>
                <Separation />
                <DownloadBackups />
                <VerifyBackups />
                <AdminSwitch>
                    <RecoverFunds />
                </AdminSwitch>
            </Card>
        </CardWithTitle>
    );
};