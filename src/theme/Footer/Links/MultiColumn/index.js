import React from "react";
import LinkItem from "@theme/Footer/LinkItem";
function ColumnLinkItem({ item }) {
  return item.html ? (
    <li
      className="footer__item"
      // Developer provided the HTML, so assume it's safe.
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: item.html }}
    />
  ) : (
    <li key={item.href ?? item.to} className="footer__item">
      <LinkItem item={item} />
    </li>
  );
}
function Column({ column }) {
  return (
    <div className="flex-col justify-start items-start gap-1 inline-flex">
      <div className="footer__title">{column.title}</div>
      <ul className="footer__items clean-list">
        {column.items.map((item, i) => (
          <ColumnLinkItem key={i} item={item} />
        ))}
      </ul>
    </div>
  );
}
export default function FooterLinksMultiColumn({ columns }) {
  return (
    <div className="grid grid-cols-2 md:flex md:justify-between lg:justify-around">
      {columns.map((column, i) => (
        <Column key={i} column={column} />
      ))}
    </div>
  );
}
