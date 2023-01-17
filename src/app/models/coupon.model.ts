import { Data } from "@angular/router";

export class Coupon {
    id?: number | 0;
    companyID?: number | null;
    title?: string | null;
    description?: string | null;
    category?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    amount?: number | null;
    price?: number | null;
}
