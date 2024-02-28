import { useEffect, useState } from 'react'
import { PrimaryMultiSelect, PrimaryMultiSelectOption, PrimarySelect } from '..'
// import countries from 'assets/json/countries+states+cities.json';

export interface SelectedCountryInfo {
    name: string;
    states: {
        name: string;
        cities: {
            name: string;
        }[]
    }[]
}

type Categories = 'country'|'state'|'city';

type SC = SelectedCountryInfo;
export interface SelectCountryStateCityProps {
    values?: { country: string;  state?: string; city?: string; },
    errors?: { country?: boolean; state?: boolean; city?: boolean; },
    bottomText?: { country: string;  state?: string; city?: string; },
    onChange?: {
        country?: (value: PrimaryMultiSelectOption) => void;
        state?: (value: PrimaryMultiSelectOption) => void;
        city?: (value: PrimaryMultiSelectOption) => void;
    }
}

export const SelectCountryStateCity: React.FC<SelectCountryStateCityProps> = ({
    values,
    errors,
    bottomText,
    onChange = {
        country: () => {},
        state: () => {},
        city: () => {},
    },
}) => {
    const [data, setData] = useState<SelectedCountryInfo[]>([])
    const [country, setCountry] = useState<SelectedCountryInfo>();
    const [state, setState] = useState<SelectedCountryInfo['states'][0]>();

    const handleFetchCountriesJson = () => {
        import('assets/json/countries+states+cities.json').then((data) => {
            // console.log(data,)
            const extract = data ? Object.values(data) : null;
            if (extract) {
                const countries = extract as any;
                setData([...countries]);
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const mapCountries = () => {
        let mapped: PrimaryMultiSelectOption[] = [];
        (data).map((c, _i) => {
            if (c.name && c.name.length) {
                let mappedObj: PrimaryMultiSelectOption = { 'label': c.name, 'value': c.name, data: c }
                mapped.push(mappedObj)
            }
        })

        return mapped;
    }

    const mapStates = () => {
        let mapped: PrimaryMultiSelectOption[] = [];
        (country?.states ?? []).map((c, _i) => {
            if (c.name && c.name.length) {
                let mappedObj: PrimaryMultiSelectOption = { 'label': c.name, 'value': c.name, data: c }
                mapped.push(mappedObj)
            }
        })

        return mapped;
    }

    const mapCities = () => {
        let mapped: PrimaryMultiSelectOption[] = [];
        (state?.cities ?? []).map((c, _i) => {
            if (c.name && c.name.length) {
                let mappedObj: PrimaryMultiSelectOption = { 'label': c.name, 'value': c.name }
                mapped.push(mappedObj)
            }
        })

        return mapped;
    }

    useEffect(() => {
        handleFetchCountriesJson();
        return () => {
            // Cleanup logic can be placed here
            // console.log('Component unmounted');
        };
    }, [])

    return (
        <>
            <div className="mb-4">
                <PrimaryMultiSelect
                    isMulti={false}
                    label='Country'
                    name="country"
                    placeholder="Select a country"
                    value={(values?.country && {label: values?.country, value: values?.country})}
                    error={errors?.country}
                    bottomText={bottomText?.country}
                    options={mapCountries()}
                    onChange={(sel) => {
                        setCountry(sel.data)
                        if(onChange?.country ){
                            onChange?.country(sel)
                        }
                    }}
                />
            </div>
            <div className="mb-4">
                <PrimaryMultiSelect
                    isMulti={false}
                    label='State'
                    name="state"
                    placeholder="Select a state"
                    value={(values?.state && {label: values?.state, value: values?.state})}
                    error={errors?.state}
                    bottomText={bottomText?.state}
                    options={mapStates()}
                    onChange={(sel) => {
                        setState(sel.data)
                        if(onChange?.state){
                            onChange?.state(sel)
                        } 
                    }}
                />
            </div>
            <div className="mb-4">
                <PrimaryMultiSelect
                    isMulti={false}
                    label='City'
                    name="city"
                    placeholder="Select a city"
                    value={(values?.city && {label: values?.city, value: values?.city})}
                    error={errors?.city}
                    bottomText={bottomText?.city}
                    options={mapCities()}
                    onChange={(sel) => {
                        setCountry(sel.data)
                        if(onChange?.city){
                            onChange?.city(sel)
                        }
                    }}
                />
            </div>
        </>
    )
}