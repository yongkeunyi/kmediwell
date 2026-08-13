/**
 * gencow/index.ts — Entry point
 *
 * Gencow runtime loads this file and registers procedures and createCrud via defineApi.
 */
import "./runtime";

import { defineApi } from "@gencow/core";
import { sitesCrud } from "./sites";
import { ebooksCrud, mySubscriptions as ebooksMySubscriptions, subscribe as ebooksSubscribe, unsubscribe as ebooksUnsubscribe } from "./ebooks";
import { articlesCrud } from "./articles";
import { measure as healingMeasure, history as healingHistory, recommend as healingRecommend } from "./healing";
import { list as bookingsList, create as bookingsCreate } from "./bookings";
import { apply as sellersApply, myApplication as sellersMyApplication } from "./sellers";

export default defineApi({
  crud: {
    sites: sitesCrud,
    ebooks: ebooksCrud,
    articles: articlesCrud,
  },
  procedures: {
    healingMeasure,
    healingHistory,
    healingRecommend,
    bookingsList,
    bookingsCreate,
    ebooksMySubscriptions,
    ebooksSubscribe,
    ebooksUnsubscribe,
    sellersApply,
    sellersMyApplication,
  },
});
