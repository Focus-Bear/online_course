import { Language } from 'constants/enum';
import { useMemo, useState } from 'react';
import i18n from 'services/i18next';
import { useAppDispatch, useAppSelector } from 'store';
import { updateCurrentLanguage } from 'store/reducer/setting';

const LanguageSelector = () => {
  const dispatch = useAppDispatch();
  const { currentLanguage } = useAppSelector((state) => state.setting);
  const isSpanishSelected = useMemo(
    () => currentLanguage === Language.ES,
    [currentLanguage],
  );

  return (
    <label
      onChange={() => {
        const langCode = isSpanishSelected ? Language.EN : Language.ES;
        dispatch(updateCurrentLanguage(langCode));
        i18n.changeLanguage(langCode);
      }}
      className='cursor-pointer'
    >
      <input
        type='checkbox'
        className='appearance-none inputSwitch'
        defaultChecked={isSpanishSelected}
        data-text={isSpanishSelected ? Language.ES : Language.EN}
      />
    </label>
  );
};

export default LanguageSelector;
