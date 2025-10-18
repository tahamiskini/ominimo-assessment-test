// import TwoFactorRecoveryCodes from '@/components/two-factor-recovery-codes';
// import TwoFactorSetupModal from '@/components/two-factor-setup-modal';
// import { disable, enable, show } from '@/routes/two-factor';
import { type BreadcrumbItem } from '@/types';
import { useState } from 'react';

interface TwoFactorProps {
    requiresConfirmation?: boolean;
    twoFactorEnabled?: boolean;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Two-Factor Authentication',
        href: show.url(),
    },
];

export default function TwoFactor({
    requiresConfirmation = false,
    twoFactorEnabled = false,
}: TwoFactorProps) {
    // const {
    //     qrCodeSvg,
    //     hasSetupData,
    //     manualSetupKey,
    //     clearSetupData,
    //     fetchSetupData,
    //     recoveryCodesList,
    //     fetchRecoveryCodes,
    //     errors,
    // } = useTwoFactorAuth();

    return <></>;
}
