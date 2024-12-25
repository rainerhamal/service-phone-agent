# Your Server -> Retell Events
from typing import Any, List, Optional, Literal, Union
from pydantic import BaseModel
from typing import Literal, Dict, Optional

class ConfigResponse(BaseModel):
    response_type: Literal["config"] = "config"
    config: Dict[str, bool] = {
        "auto_reconnect": bool,
        "call_details": bool,
        } # type: ignore