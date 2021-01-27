import ReactModal from "react-modal";
import React from "react";
import {Button} from "antd";
import Link from "@docusaurus/core/lib/client/exports/Link";

export function InstrumentationModal(props) {
    const {isOpen, onClose} = props;

    function RowCard({children,className}) {
        return <div className={"row"}>
            <div className={`instrumentation-card ${className}`}
                 style={{background: "#fff", color: "#333333", borderRadius: "0.2rem", height: "100%"}}>
                <div className="" style={{display: "flex", justifyContent: "center"}}>
                    {children}
                </div>
            </div>

        </div>;
    }

    return (
        <ReactModal
            isOpen={isOpen}
            contentLabel="onRequestClose Example"
            onRequestClose={onClose}
            className="instrumentation-modal"
            overlayClassName="Overlay"
        >
            <RowCard>
                <div>
                    <div>

                    </div>
                    <div>
                        <span className={"heading"}>No instrumentation data.</span><br/>
                        Please instrument your application as mentioned here
                    </div>
                </div>
            </RowCard>
            <br/>
            <RowCard>
                <div>
                    <div>

                    </div>
                    <div>
                        Instrumentation data being received. Go to Dashboard
                    </div>
                    <div>
                        <Link style={{"margin": "6px"}}
                              className="button button--primary"
                             >

                            Get Started
                        </Link>
                    </div>
                </div>
            </RowCard>

        </ReactModal>
    )
}