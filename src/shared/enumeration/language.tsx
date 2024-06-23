import ENFlag from '@/components/shared/icons/ENFlag';
import VNFlag from '@/components/shared/icons/VNFlag';

export enum LanguageEnum {
  vi = 'vi',
  en = 'en',
}

export const languageEnumArray: LanguageEnum[] = [LanguageEnum.vi, LanguageEnum.en];

export const mapLanguageEnum: { [key in LanguageEnum]: string } = {
  [LanguageEnum.vi]: 'VN',
  [LanguageEnum.en]: 'EN',
};

export const mapLanguageIcon: { [key in LanguageEnum]: JSX.Element } = {
  [LanguageEnum.vi]: <VNFlag width={24} height={24} />,
  [LanguageEnum.en]: <ENFlag width={24} height={24} />,
};

export const mapLanguageEnumOption: { value: string; label: string }[] = [
  {
    value: LanguageEnum.vi,
    label: mapLanguageEnum[LanguageEnum.vi],
  },
  {
    value: LanguageEnum.en,
    label: mapLanguageEnum[LanguageEnum.en],
  },
];
