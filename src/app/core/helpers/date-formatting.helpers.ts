export function generatePeriodsFormDataVerificationPeriodTypeAndSupervisionDate(
  type: string,
  period: any,
  supervisionDate: Date,
  selectedYear: any,
  verificationPeriodElemId: string,
  action?: string
) {
  const year = selectedYear
    ? selectedYear
    : new Date(supervisionDate).getFullYear();
  let month = new Date(supervisionDate).getMonth() + 1;

  let periods = [];
  if (type === 'Quarterly') {
    const maxQuarterForCurrentYear = period
      ? period
      : month < 4
      ? null
      : month < 6
      ? 'Q1'
      : month > 6 && month < 9
      ? 'Q2'
      : month > 10
      ? 'Q3'
      : 'Q4';
    periods = maxQuarterForCurrentYear
      ? [
          ...periods,
          {
            id: year + maxQuarterForCurrentYear,
            elementId: verificationPeriodElemId,
            valueKey: maxQuarterForCurrentYear,
            name: year + maxQuarterForCurrentYear,
          },
        ]
      : [];
    for (let count = 0; count < 3; count++) {
      const prevQuarterNumber =
        periods.length > 0
          ? Number(
              periods[periods.length - 1]['id'].substring(
                periods[periods.length - 1]['id'].length - 1
              )
            )
          : 4;
      const currentYear =
        periods.length > 0
          ? Number(periods[periods.length - 1]['id'].substring(0, 4))
          : year;
      periods = [
        ...periods,
        {
          id:
            (prevQuarterNumber === 1 ? currentYear - 1 : currentYear) +
            'Q' +
            (prevQuarterNumber === 1
              ? 5 - prevQuarterNumber
              : prevQuarterNumber - 1),
          valueKey:
            'Q' +
            (prevQuarterNumber === 1
              ? 5 - prevQuarterNumber
              : prevQuarterNumber - 1),
          elementId: verificationPeriodElemId,
          name:
            (prevQuarterNumber === 1 ? currentYear - 1 : currentYear) +
            'Q' +
            (prevQuarterNumber === 1
              ? 5 - prevQuarterNumber
              : prevQuarterNumber - 1),
        },
      ];
    }
  } else if (type === 'Yearly') {
    periods = [];
    for (let count = 0; count < 4; count++) {
      periods = [
        ...periods,
        {
          id: year - count,
          elementId: verificationPeriodElemId,
          valueKey: 'Y' + (count + 1),
          name: year - count,
        },
      ];
    }
  } else if (type === 'Monthly') {
    month = !period ? month : Number(period);
    periods = [];
    for (let count = 0; count < 12; count++) {
      periods = [
        ...periods,
        {
          id:
            year +
            (month - count <= 0 ? -1 : 0) +
            doubleChars(
              (month - count > 0
                ? month - count
                : 12 + (month - count)
              ).toString()
            ),
          elementId: verificationPeriodElemId,
          valueKey: doubleChars(
            (month - count > 0
              ? month - count
              : 12 + (month - count)
            ).toString()
          ),
          name:
            year +
            (month - count <= 0 ? -1 : 0) +
            ' ' +
            doubleChars(
              (month - count > 0
                ? month - count
                : 12 + (month - count)
              ).toString()
            ),
        },
      ];
    }
  } else {
    periods = [];
  }
  console.log('pers', periods);
  return periods;
}

function doubleChars(number: string): string {
  return number.length == 1 ? '0' + number : number;
}
